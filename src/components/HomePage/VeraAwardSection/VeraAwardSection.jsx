"use client";

import { useRef, Suspense, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  PerspectiveCamera,
  useGLTF
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "./VeraAwardSection.css";

gsap.registerPlugin(ScrollTrigger);

function ManegeModel() {
  const { scene } = useGLTF("/models/manege.glb");
  const memoizedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <primitive
      object={memoizedScene}
      scale={7.5}
      position={[0, -0.6, 0]}
      rotation={[0.1, 0.3, 0]}
      castShadow
      receiveShadow
    />
  );
}

useGLTF.preload("/models/manege.glb");

function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.4, 5]} fov={80} />
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.9} groundColor="#222222" />
      <directionalLight
        position={[3, 5, 3]}
        intensity={1.3}
        castShadow
      />
      <Suspense fallback={null}>
        <ManegeModel />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.3}
          scale={6}
          blur={2}
        />
      </Suspense>
      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={3}
        maxDistance={7}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function VeraAwardSection({ id = "vera-award-section" }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);
  const blocksRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [formOpen, setFormOpen] = useState(false);

  const handleFormSubmit = (data) => {
    console.log("Отправленные данные:", data);
    setFormOpen(false);
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const baseTrigger = {
          trigger: section,
          start: "top 75%",
          end: "top 30%",
          toggleActions: "play none none reverse"
        };

        if (badgeRef.current) {
          gsap.fromTo(
            badgeRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: baseTrigger }
          );
        }

        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.1,
              ease: "power3.out",
              scrollTrigger: baseTrigger
            }
          );
        }

        if (subtitleRef.current) {
          gsap.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.25,
              ease: "power3.out",
              scrollTrigger: baseTrigger
            }
          );
        }

        if (statsRef.current) {
          gsap.fromTo(
            statsRef.current.querySelectorAll(".vera-stat-item"),
            { opacity: 0, y: 20, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              delay: 0.35,
              ease: "power3.out",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        if (blocksRef.current) {
          gsap.fromTo(
            blocksRef.current.querySelectorAll(".vera-block"),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: blocksRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        if (canvasContainerRef.current) {
          gsap.fromTo(
            canvasContainerRef.current,
            { opacity: 0, x: 80, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: canvasContainerRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
      
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id={id} className="vera-section">
      <div className="vera-background">
        <div className="vera-bg-gradient vera-bg-gradient--1" />
        <div className="vera-bg-gradient vera-bg-gradient--2" />
        <div className="vera-bg-pattern" />
      </div>

      <div className="vera-container">
        {/* Левая «витрина» */}
        <div ref={canvasContainerRef} className="vera-canvas-shell">
          <div className="vera-canvas-frame">
            <Canvas
              shadows={false}
              dpr={[1, 1.5]}
              frameloop="demand"
            >
              <Scene3D />
            </Canvas>
            <div className="vera-canvas-hint">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12C4 8.13 7.13 5 11 5H13C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19H11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12L4 12L6 10M6 14L4 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Поверните Манеж мышью</span>
            </div>
          </div>
        </div>

        {/* Правая текстовая колонка */}
        <div className="vera-content">
          <div ref={badgeRef} className="vera-badge">
            <span className="vera-badge-dot" />
            <span>Гранд‑финал 2026 · Москва</span>
          </div>

          <h2 ref={titleRef} className="vera-title">
            ГРАНД‑ФИНАЛ: <span className="vera-title-highlight">МАНЕЖ 2026</span>
          </h2>

          <p ref={subtitleRef} className="vera-subtitle">
            Невидимый слой. Вызов. Решение. Ужин. Награждение. Финал.
          </p>

          <div ref={statsRef} className="vera-stats-row">
            <div className="vera-stat-item">
              <div className="vera-stat-number">26</div>
              <div className="vera-stat-label">Ноября 2026</div>
            </div>
            <div className="vera-stat-item">
              <div className="vera-stat-number">Манеж</div>
              <div className="vera-stat-label">50 м от Кремля</div>
            </div>
            <div className="vera-stat-item">
              <div className="vera-stat-number">4 ч</div>
              <div className="vera-stat-label">Живая демонстрация</div>
            </div>
            <div className="vera-stat-item">
              <div className="vera-stat-number">AR</div>
              <div className="vera-stat-label">Очки Kizo</div>
            </div>
          </div>

          <div className="vera-timeline">
            <div className="vera-timeline-line" />
            <div ref={blocksRef} className="vera-blocks">
              <div className="vera-block">
                <h3 className="vera-block-title">ВЫЗОВ</h3>
                <p>
                  Манеж находится в 50 метрах от Кремля. В этой зоне безопасности GPS глушится, и шоу дронов физически невозможны: воздух закрыт, традиционные спецэффекты не работают.
                </p>
              </div>

              <div className="vera-block">
                <h3 className="vera-block-title">РЕШЕНИЕ</h3>
                <p>
                  Вместо неба — невидимый слой. Общая цифровая реальность через AR‑очки Kizo превращает ограничения безопасности в демонстрацию технологий, доступную только участникам.
                </p>
              </div>

              <div className="vera-block">
                <h3 className="vera-block-title">УЖИН</h3>
                <p>
                  Центральные композиции на столах оживают в цифре синхронно с подачей блюд. Виртуальные объекты реагируют на физические в реальном времени, создавая единый сценарий вечера.
                </p>
              </div>

              <div className="vera-block">
                <h3 className="vera-block-title">НАГРАЖДЕНИЕ</h3>
                <p>
                  Победители появляются не только на сцене. Их проекты проявляются как массивные 3D‑голограммы, парящие над залом и видимые только через AR‑очки гостей.
                </p>
              </div>

              <div className="vera-block">
                <h3 className="vera-block-title">ФИНАЛ</h3>
                <p>
                  Синхронизированный «Skyfall» цифрово снимает крышу Манежа, открывая созвездие «Цветок Жизни», которое накрывает Землю защитным куполом в общей цифровой реальности.
                </p>
              </div>

              <div className="vera-block vera-block--accent">
                <h3 className="vera-block-title">СТРАТЕГИЧЕСКАЯ ПОБЕДА</h3>
                <p>
                  Гала‑ужин превращается в четырёхчасовую живую демонстрацию суверенных российских носимых технологий. Techspace доказывает, что новые миры можно строить без опоры на физическое пространство. «Суверенитет безграничен».
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
