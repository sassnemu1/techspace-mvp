"use client";

import { useLayoutEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

import "./ProstranstvoSection.css";

// Предзагрузка моделей
const modelUrls = ["/models/1.glb","/models/2.glb","/models/3.glb","/models/4.glb"];
modelUrls.forEach(url => useGLTF.preload(url));

function Model({ url }) {
  const { scene } = useGLTF(url);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.2 / maxDim;
    scene.scale.setScalar(scale);

    // Включаем фрустумное отсечение для оптимизации
    scene.traverse((child) => {
      if (child.isMesh) child.frustumCulled = true;
    });
  }, [scene]);

  return <primitive object={scene} dispose={null} />;
}

function Scene3D({ modelUrl }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4, 5]} fov={20} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 8, 5]} intensity={1.2} castShadow />

      <Center>
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>
      </Center>

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
      />
    </>
  );
}

export default function ProstranstvoSection() {
  useLayoutEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const bg = document.querySelector('.gallery-bg');
      const overlay = document.querySelector('.gallery-overlay');

      if (bg) bg.style.transform = `translateY(${scroll*0.03}px) scale(1.2)`;
      if (overlay) overlay.style.transform = `translateY(${scroll*0.06}px) scale(1.3)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const floors = [
    {
      id: 1,
      subtitle: "КУВШИНКА (LILY PAD) Точка Входа и Фабрика",
      title: "Место встречи физического и цифрового миров",
      description: `Gen-Lab: Действующая микро-фабрика под управлением printing.lotusCity.ai. Четыре ИИ-терминала E-Station и промышленные 3D-принтеры превращают ваши чертежи в материю за считанные минуты.\n
Цифровой Фасад: 12 исторических арок, транслирующих пульс технологий на Тверскую улицу.\n
Tech-Café: Зона нетворкинга, интегрированная с крипто-экосистемой Konekt.`,
      model: "/models/1.glb"
    },
    {
      id: 2,
      subtitle: "УРОВЕНЬ 2: ЛЕПЕСТКИ (LOWER PETALS) Чистая Экспозиция",
      title: "Пространство максимальной концентрации идей",
      description: `Этот этаж полностью отдан под еженедельные технологические спринты.\n
Радиальный Зал: Архитектура «Веера» создает идеальный обзор для 25 модульных стендов (10 м²). Здесь располагаются самые динамичные стартапы недели.`,
      model: "/models/2.glb"
    },
    {
      id: 3,
      subtitle: "УРОВЕНЬ 3: ЛЕПЕСТКИ (UPPER PETALS) Тяжелая Индустрия и Акселераторы",
      title: "Зона стратегического партнерства",
      description: `Здесь молодые инженеры встречаются с индустриальными гигантами.\n
Экспозиция Deep Tech: Усиленная зона для демонстрации промышленной робототехники и тяжелого оборудования (15 стендов).\n
Два Стратегических Хаба (20 м²): Постоянные резиденции («Посольства») наших ключевых партнеров.\n
Международный Хаб: Точка входа для партнеров из БРИКС (Китай/ОАЭ).`,
      model: "/models/3.glb"
    },
    {
      id: 4,
      subtitle: "УРОВЕНЬ 4: ЦВЕТЕНИЕ (THE BLOOM) Мозговой Центр и Акселератор Росатома",
      title: "Вершина экосистемы",
      description: `Это закрытый клуб для диалога между инвесторами, чиновниками и визионерами, усиленный мощью госкорпорации.\n
Акселератор Росатома: Эксклюзивная зона (Lab), где госкорпорация отбирает и пилотирует квантовые и энергетические проекты резидентов Techspace. Прямой лифт к госзаказу.\n
Media Studio: Стеклянный куб studio.lastochka.ai, транслирующий подкасты и стримы.\n
Главная Сцена: Изогнутый LED-экран и пространство-трансформер для VIP-презентаций и закрытых показов War-Tech.`,
      model: "/models/4.glb"
    }
  ];

  return (
    <section className="gallery-page">
      {floors.map((floor, index) => {
        const isCanvasRight = index % 2 === 0;

        return (
          <section key={floor.id} className="floor-section">
            <div
              className="floor-container"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "60px" }}
            >
              {isCanvasRight && (
                <div className="floor-content">
                  <span className="floor-subtitle">{floor.subtitle}</span>
                  <h2 className="floor-title">{floor.title}</h2>
                  <p className="floor-description">{floor.description}</p>
                </div>
              )}

              <div className="floor-image-wrapper">
                <Canvas frameloop="demand" shadows={false}>
                  <Scene3D modelUrl={floor.model} />
                </Canvas>
              </div>

              {!isCanvasRight && (
                <div className="floor-content">
                  <span className="floor-subtitle">{floor.subtitle}</span>
                  <h2 className="floor-title">{floor.title}</h2>
                  <p className="floor-description">{floor.description}</p>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </section>
  );
}
