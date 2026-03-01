"use client";

import { useEffect, useLayoutEffect, useRef, useMemo, Suspense, memo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

import "./ProstranstvoSection.css";

// Предзагрузка моделей вне компонента (один раз при импорте модуля)
const MODEL_URLS = ["/models/1.glb", "/models/2.glb", "/models/3.glb", "/models/4.glb"];
MODEL_URLS.forEach((url) => useGLTF.preload(url));

// Данные этажей вне компонента — не пересоздаются при каждом рендере
const FLOORS = [
  {
    id: 1,
    subtitle: "КУВШИНКА (LILY PAD) Точка Входа и Фабрика",
    title: "Место встречи физического и цифрового миров",
    description: `Gen-Lab: Действующая микро-фабрика под управлением printing.lotusCity.ai. Четыре ИИ-терминала E-Station и промышленные 3D-принтеры превращают ваши чертежи в материю за считанные минуты.\n\nЦифровой Фасад: 12 исторических арок, транслирующих пульс технологий на Тверскую улицу.\n\nTech-Café: Зона нетворкинга, интегрированная с крипто-экосистемой Konekt.`,
    model: "/models/1.glb",
  },
  {
    id: 2,
    subtitle: "УРОВЕНЬ 2: ЛЕПЕСТКИ (LOWER PETALS) Чистая Экспозиция",
    title: "Пространство максимальной концентрации идей",
    description: `Этот этаж полностью отдан под еженедельные технологические спринты.\n\nРадиальный Зал: Архитектура «Веера» создает идеальный обзор для 25 модульных стендов (10 м²). Здесь располагаются самые динамичные стартапы недели.`,
    model: "/models/2.glb",
  },
  {
    id: 3,
    subtitle: "УРОВЕНЬ 3: ЛЕПЕСТКИ (UPPER PETALS) Тяжелая Индустрия и Акселераторы",
    title: "Зона стратегического партнерства",
    description: `Здесь молодые инженеры встречаются с индустриальными гигантами.\n\nЭкспозиция Deep Tech: Усиленная зона для демонстрации промышленной робототехники и тяжелого оборудования (15 стендов).\n\nДва Стратегических Хаба (20 м²): Постоянные резиденции («Посольства») наших ключевых партнеров.\n\nМеждународный Хаб: Точка входа для партнеров из БРИКС (Китай/ОАЭ).`,
    model: "/models/3.glb",
  },
  {
    id: 4,
    subtitle: "УРОВЕНЬ 4: ЦВЕТЕНИЕ (THE BLOOM) Мозговой Центр и Акселератор Росатома",
    title: "Вершина экосистемы",
    description: `Это закрытый клуб для диалога между инвесторами, чиновниками и визионерами, усиленный мощью госкорпорации.\n\nАкселератор Росатома: Эксклюзивная зона (Lab), где госкорпорация отбирает и пилотирует квантовые и энергетические проекты резидентов Techspace. Прямой лифт к госзаказу.\n\nMedia Studio: Стеклянный куб studio.lastochka.ai, транслирующий подкасты и стримы.\n\nГлавная Сцена: Изогнутый LED-экран и пространство-трансформер для VIP-презентаций и закрытых показов War-Tech.`,
    model: "/models/4.glb",
  },
];

// Model компонент мемоизирован — не пересоздаётся если url не изменился
const Model = memo(function Model({ url }) {
  const { scene } = useGLTF(url);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      scene.scale.setScalar(2.2 / maxDim);
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = true;
        // Отключаем castShadow/receiveShadow т.к. shadows={false} на Canvas
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
  }, [scene]);

  return <primitive object={scene} dispose={null} />;
});

// Сцена мемоизирована — не пересоздаётся при ре-рендере родителя
const Scene3D = memo(function Scene3D({ modelUrl }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4, 5]} fov={20} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 8, 5]} intensity={1.2} />
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
});

// Отдельный компонент для Canvas с lazy-loading через IntersectionObserver
const LazyCanvas = memo(function LazyCanvas({ modelUrl }) {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !mountedRef.current) {
          mountedRef.current = true;
          // Форсируем ре-рендер чтобы показать Canvas
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="floor-image-wrapper">
      <Canvas frameloop="demand" shadows={false} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Scene3D modelUrl={modelUrl} />
      </Canvas>
    </div>
  );
});

// Компонент контента этажа
const FloorContent = memo(function FloorContent({ subtitle, title, description }) {
  return (
    <div className="floor-content">
      <span className="floor-subtitle">{subtitle}</span>
      <h2 className="floor-title">{title}</h2>
      <p className="floor-description">{description}</p>
    </div>
  );
});

export default function ProstranstvoSection() {
  const bgRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    let lastScroll = -1;

    const handleScroll = () => {
      const scroll = window.scrollY;
      // Пропускаем если значение не изменилось
      if (scroll === lastScroll) return;
      lastScroll = scroll;

      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scroll * 0.03}px) scale(1.2)`;
      }
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translateY(${scroll * 0.06}px) scale(1.3)`;
      }
    };

    // RAF-throttle для scroll
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="gallery-page">

      {FLOORS.map((floor, index) => {
        const isCanvasRight = index % 2 === 0;

        return (
          <section key={floor.id} className="floor-section">
            <div className="floor-container">
              {isCanvasRight && (
                <FloorContent
                  subtitle={floor.subtitle}
                  title={floor.title}
                  description={floor.description}
                />
              )}

              <LazyCanvas modelUrl={floor.model} />

              {!isCanvasRight && (
                <FloorContent
                  subtitle={floor.subtitle}
                  title={floor.title}
                  description={floor.description}
                />
              )}
            </div>
          </section>
        );
      })}
    </section>
  );
}