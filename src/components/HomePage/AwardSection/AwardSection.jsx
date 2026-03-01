"use client";

import { useState, useEffect, Suspense, useRef, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import "./AwardsSection.css";

const MODEL_PATHS = {
  grand:  "/models/grand-optimized.glb",
  medium: "/models/medium-optimized.glb",
  mini:   "/models/mini-optimized.glb",
};

// Draco-декодер — нужен до useGLTF, но НЕ preload
useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

// ─── НЕТ useGLTF.preload — 3 модели сразу на старте страницы = главная причина тормозов
// Каждая модель загрузится только когда её секция появится в viewport

// ─── Renderer ────────────────────────────────────────────────────────────────

function RendererSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.outputColorSpace    = THREE.SRGBColorSpace;
    gl.toneMapping         = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.75;
  }, [gl]);
  return null;
}

// ─── Loading placeholder (внутри Canvas) ─────────────────────────────────────

function LoadingMesh() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.6;
    ref.current.material.opacity = 0.12 + Math.sin(clock.getElapsedTime() * 2) * 0.06;
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial color="#fff" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

// ─── Model ────────────────────────────────────────────────────────────────────
// Мутируем оригинальную сцену только один раз (scaledRef + materialRef).
// При повторном монтировании пропускаем — useGLTF кэширует объект глобально.

const AwardModel = memo(function AwardModel({ modelKey, isVisible }) {
  const { scene }   = useGLTF(MODEL_PATHS[modelKey]);
  const groupRef    = useRef();
  const scaledRef   = useRef(false);
  const materialRef = useRef(false);

  useEffect(() => {
    if (!scene || materialRef.current) return;
    materialRef.current = true;
    scene.traverse((node) => {
      if (!node.isMesh || !node.material) return;
      const m = node.material;
      if (m.map)         m.map.colorSpace        = THREE.SRGBColorSpace;
      if (m.emissiveMap) m.emissiveMap.colorSpace = THREE.SRGBColorSpace;
      m.metalness       = 0.45;
      m.roughness       = 0.65;
      m.envMapIntensity = 0.7;
      m.normalMap       = null;
      m.displacementMap = null;
      m.side            = THREE.FrontSide;
      m.needsUpdate     = true;
      node.castShadow    = false;
      node.receiveShadow = false;
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Нормализация масштаба — один раз
    if (!scaledRef.current) {
      const box    = new THREE.Box3().setFromObject(groupRef.current);
      const size   = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const s = 2.8 / maxDim;
        groupRef.current.scale.setScalar(s);
        groupRef.current.position.set(-center.x * s, -center.y * s, -center.z * s);
        scaledRef.current = true;
      }
    }

    if (isVisible) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
});

// ─── AwardCanvas ─────────────────────────────────────────────────────────────
// frameloop="always" когда видим, "never" когда вне viewport — не жжём GPU зря.
// Canvas монтируется только после того как строка попала в viewport (lazy).
// isReady передаётся снаружи из IntersectionObserver родителя.

const AwardCanvas = memo(function AwardCanvas({ modelKey, isReady }) {
  const wrapRef = useRef();
  const [isInView, setIsInView] = useState(true);

  // Пауза анимации когда элемент вне viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsInView(e.isIntersecting),
      { threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!isReady) return <div className="award-visual__skeleton" />;

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={isInView ? "always" : "never"}
        camera={{ position: [0, 0, 8], fov: 22 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        shadows={false}
        onCreated={({ gl }) => {
          // Обработка потери GL-контекста (актуально на мобильных)
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            console.warn("[AwardsSection] WebGL context lost");
          });
        }}
      >
        <RendererSetup />
        <Environment preset="city" />
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 5]} intensity={0.9} />
        <directionalLight position={[-4, 2, -4]} intensity={0.2} color="#8ab4f8" />

        <Suspense fallback={<LoadingMesh />}>
          <AwardModel modelKey={modelKey} isVisible={isInView} />
        </Suspense>

        <ContactShadows
          position={[0, -1.6, 0]}
          opacity={0.35}
          scale={4}
          blur={2}
          frames={1}
        />
      </Canvas>
    </div>
  );
});

// ─── AwardsSection ────────────────────────────────────────────────────────────

const AWARDS = [
  {
    id: 1,
    title: "NextGen Prize",
    subtitle: "Global Impact Award",
    description:
      "Присуждается стартапам, вышедшим за рамки локального рынка и доказавшим масштабируемость продукта на международной арене.",
    modelKey: "grand",
  },
  {
    id: 2,
    title: "TechNova",
    subtitle: "Innovation & Breakthrough",
    description:
      "Награда за технологический прорыв и формирование новых категорий продуктов внутри индустрии.",
    modelKey: "medium",
  },
  {
    id: 3,
    title: "Orbit Award",
    subtitle: "Future Vision",
    description:
      "Премия для проектов на ранней стадии с сильным видением и потенциалом долгосрочного влияния.",
    modelKey: "mini",
  },
];

export default function AwardsSection({ id = "awards-section" }) {
  // Какие строки уже вошли в viewport и готовы монтировать Canvas
  const [readySet, setReadySet] = useState(new Set());
  const rowRefs = useRef([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      // Fallback для старых браузеров — показываем всё сразу
      setReadySet(new Set(AWARDS.map((_, i) => i)));
      return;
    }

    const observers = [];

    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setReadySet((prev) => new Set([...prev, i]));
            obs.disconnect();
          }
        },
        { rootMargin: "250px" } // начинаем загрузку чуть раньше появления
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id={id} className="awards-section">
      <div className="awards-container">
        <header className="awards-header">
          <span className="awards-kicker">Наши премии</span>
          <h2 className="awards-heading">Победители и достижения</h2>
        </header>

        <div className="awards-timeline">
          <span className="timeline-line" />

          {AWARDS.map((award, index) => (
            <div
              key={award.id}
              ref={(el) => (rowRefs.current[index] = el)}
              className={`award-row ${index % 2 ? "reverse" : ""}`}
            >
              <div className="award-text">
                <span className="award-subtitle">{award.subtitle}</span>
                <h3 className="award-title">{award.title}</h3>
                <p className="award-description">{award.description}</p>
              </div>

              <div className="timeline-node" />

              <div className="award-visual">
                <AwardCanvas
                  modelKey={award.modelKey}
                  isReady={readySet.has(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}