"use client";

import { useState, useEffect, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import "./AwardsSection.css";

const modelPaths = {
  grand: "/models/grand.glb",
  medium: "/models/medium.glb",
  mini: "/models/mini.glb",
};

Object.values(modelPaths).forEach((path) => useGLTF.preload(path));

function AwardModel({ modelKey }) {
  const { scene } = useGLTF(modelPaths[modelKey]);

  useLayoutEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    scene.scale.setScalar(4 / maxDim);

    scene.traverse((node) => {
      if (node.isMesh) {
        if (!node.material) return;

        node.material.metalness = 0.2;
        node.material.roughness = 0.7;
        node.material.side = THREE.FrontSide;
        node.material.normalMap = null;
        node.material.displacementMap = null;
        node.material.needsUpdate = true;

        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group position={[0, 0.1, 0]}>
      <primitive object={scene} />
    </group>
  );
}



function AwardCanvas({ modelKey }) {
  return (
    <Canvas camera={{ position: [2, 2, 7], fov: 18 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -3, 5]} intensity={0.6} />

      <Center>
        <Suspense fallback={null}>
          <AwardModel modelKey={modelKey} />
        </Suspense>
      </Center>

      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.25}
        scale={6}
        blur={1.5}
      />
    </Canvas>
  );
}

export default function AwardsSection({ id = "awards-section" }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const awards = [
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
              className={`award-row ${index % 2 ? "reverse" : ""}`}
            >
              <div className="award-text">
                <span className="award-subtitle">{award.subtitle}</span>
                <h3 className="award-title">{award.title}</h3>
                <p className="award-description">{award.description}</p>
              </div>

              <div className="timeline-node" />

              <div className="award-visual">
                <AwardCanvas modelKey={award.modelKey} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
