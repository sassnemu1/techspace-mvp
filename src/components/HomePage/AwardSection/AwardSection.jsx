"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import "./AwardsSection.css";

const modelPaths = {
  grand:  "/models/grand.glb",
  medium: "/models/medium.glb",
  mini:   "/models/mini.glb",
};

useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
Object.values(modelPaths).forEach((p) => useGLTF.preload(p));

function RendererSetup() {
  const { gl } = useThree();
  useEffect(() => {
    gl.outputColorSpace    = THREE.SRGBColorSpace;
    gl.toneMapping         = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.75; // ← было 1.0 — притушили общую яркость
  }, [gl]);
  return null;
}

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

function AwardModel({ modelKey, isVisible }) {
  const { scene } = useGLTF(modelPaths[modelKey]);
  const groupRef  = useRef();
  const scaledRef = useRef(false);

  useEffect(() => {
    if (!scene) return;
    scene.traverse((node) => {
      if (!node.isMesh || !node.material) return;
      const m = node.material;
      if (m.map)         m.map.colorSpace        = THREE.SRGBColorSpace;
      if (m.emissiveMap) m.emissiveMap.colorSpace = THREE.SRGBColorSpace;
      m.metalness       = 0.45;  // чуть больше металличности
      m.roughness       = 0.65;  // чуть больше шероховатости → меньше бликов
      m.envMapIntensity = 0.7;   // ← было 1.2 — отражения стали темнее
      m.normalMap       = null;
      m.displacementMap = null;
      m.side            = THREE.FrontSide;
      m.needsUpdate     = true;
      node.castShadow    = true;
      node.receiveShadow = true;
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!scaledRef.current) {
      const box    = new THREE.Box3().setFromObject(groupRef.current);
      const size   = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) {
        const s = 2.8 / maxDim; // ← было 4 — модели стали меньше
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
}

function AwardCanvas({ modelKey }) {
  const wrapRef = useRef();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.01 }
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 8], fov: 22 }}
        flat={false}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        shadows={false}
      >
        <RendererSetup />

        {/* city даёт более тёмное, контрастное окружение чем studio */}
        <Environment preset="city" />

        {/* Убрали один directional, снизили интенсивность — было слишком светло */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 8, 5]} intensity={0.9} />
        <directionalLight position={[-4, 2, -4]} intensity={0.2} color="#8ab4f8" />

        <Suspense fallback={<LoadingMesh />}>
          <AwardModel modelKey={modelKey} isVisible={visible} />
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
}

export default function AwardsSection({ id = "awards-section" }) {
  const [visibleCanvases, setVisibleCanvases] = useState(new Set());
  const rowRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCanvases((prev) => new Set([...prev, i]));
            obs.disconnect();
          }
        },
        { rootMargin: "250px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const awards = [
    {
      id: 1,
      title: "NextGen Prize",
      subtitle: "Global Impact Award",
      description: "Присуждается стартапам, вышедшим за рамки локального рынка и доказавшим масштабируемость продукта на международной арене.",
      modelKey: "grand",
    },
    {
      id: 2,
      title: "TechNova",
      subtitle: "Innovation & Breakthrough",
      description: "Награда за технологический прорыв и формирование новых категорий продуктов внутри индустрии.",
      modelKey: "medium",
    },
    {
      id: 3,
      title: "Orbit Award",
      subtitle: "Future Vision",
      description: "Премия для проектов на ранней стадии с сильным видением и потенциалом долгосрочного влияния.",
      modelKey: "mini",
    },
  ];

  return (
    <section id={id} className="awards-section">
      <div className="awards-container">
        <header className="awards-header">
          <span className="awards-kicker">Наши премии</span>
          <h2 className="awards-heading">Победители и достижения</h2>
        </header>

        <div className="awards-timeline">
          <span className="timeline-line" />

          {awards.map((award, index) => (
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
                {visibleCanvases.has(index) ? (
                  <AwardCanvas modelKey={award.modelKey} />
                ) : (
                  <div className="award-visual__skeleton" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}