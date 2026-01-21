"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({
  frameCount = 180,
  mobileFrameCount = 90,
}) {
  /* ---------------- refs ---------------- */

  const desktopSectionRef = useRef(null);
  const desktopCanvasRef = useRef(null);
  const desktopCtxRef = useRef(null);
  const desktopCache = useRef({});

  const mobileSectionRef = useRef(null);
  const mobileCanvasRef = useRef(null);
  const mobileCtxRef = useRef(null);
  const mobileCache = useRef({});

  /* ---------------- state ---------------- */

  const [desktopReady, setDesktopReady] = useState(false);
  const [mobileReady, setMobileReady] = useState(false);

  /* ---------------- utils ---------------- */

  const isMobile = () => window.innerWidth < 768;

  const frameSrc = (i) =>
    `/seq/output_${String(i).padStart(4, "0")}.webp`;

  const frameSrcMobile = (i) =>
    `/mobile-video/output_${String(i).padStart(4, "0")}.jpg`;

  const setupCanvas = (canvas, ctxRef) => {
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
  };

  const drawFrame = (img, canvas, ctx) => {
    if (!img || !canvas || !ctx) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const imgRatio = img.width / img.height;
    const screenRatio = vw / vh;

    let dw, dh, dx, dy;

    if (imgRatio > screenRatio) {
      dh = vh;
      dw = dh * imgRatio;
      dx = (vw - dw) / 2;
      dy = 0;
    } else {
      dw = vw;
      dh = dw / imgRatio;
      dx = 0;
      dy = (vh - dh) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  const preload = (count, getSrc, cache, onDone) => {
    let loaded = 0;

    for (let i = 1; i <= count; i++) {
      const img = new Image();
      img.onload = () => {
        cache.current[i] = img;
        loaded++;
        if (loaded === count) onDone();
      };
      img.src = getSrc(i);
    }
  };

  /* ================= DESKTOP ================= */

  useEffect(() => {
    if (typeof window === "undefined" || isMobile()) return;

    setupCanvas(desktopCanvasRef.current, desktopCtxRef);

    preload(frameCount, frameSrc, desktopCache, () => {
      drawFrame(
        desktopCache.current[1],
        desktopCanvasRef.current,
        desktopCtxRef.current
      );
      setDesktopReady(true);
    });

    window.addEventListener("resize", () =>
      setupCanvas(desktopCanvasRef.current, desktopCtxRef)
    );
  }, []);

  useGSAP(() => {
    // if (!desktopReady || isMobile()) return;

    let lastFrame = 1;

    ScrollTrigger.create({
      trigger: desktopSectionRef.current,
      start: "top top",
      end: "+=800vh",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,

      onUpdate: (self) => {
        const frame = Math.round(
          1 + self.progress * (frameCount - 1)
        );

        if (
          frame !== lastFrame &&
          desktopCache.current[frame]
        ) {
          requestAnimationFrame(() =>
            drawFrame(
              desktopCache.current[frame],
              desktopCanvasRef.current,
              desktopCtxRef.current
            )
          );
          lastFrame = frame;
        }
      },
    });

    ScrollTrigger.create({
      trigger: mobileSectionRef.current,
      start: "top top",
      end: "+=800vh",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,

      onUpdate: (self) => {
        const frame = Math.round(
          1 + self.progress * (frameCount - 1)
        );

        if (
          frame !== lastFrame &&
          mobileCache.current[frame]
        ) {
          requestAnimationFrame(() =>
            drawFrame(
              mobileCache.current[frame],
              mobileCanvasRef.current,
              mobileCtxRef.current
            )
          );
          lastFrame = frame;
        }
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [desktopReady, ]);

  /* ================= MOBILE ================= */

  useEffect(() => {
    if (typeof window === "undefined" || !isMobile()) return;

    const canvas = mobileCanvasRef.current;
    const section = mobileSectionRef.current;

    setupCanvas(canvas, mobileCtxRef);

    preload(
      mobileFrameCount,
      frameSrcMobile,
      mobileCache,
      () => {
        drawFrame(
          mobileCache.current[1],
          canvas,
          mobileCtxRef.current
        );
        setMobileReady(true);
      }
    );

    const onScroll = () => {
      if (!mobileReady) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / rect.height)
      );

      const frame = Math.round(
        1 + progress * (mobileFrameCount - 1)
      );

      const img = mobileCache.current[frame];
      if (img) {
        requestAnimationFrame(() =>
          drawFrame(img, canvas, mobileCtxRef.current)
        );
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () =>
      setupCanvas(canvas, mobileCtxRef)
    );

    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileReady]);

  /* ================= JSX ================= */

  return (
    <>
      {/* MOBILE */}
      <section
        ref={mobileSectionRef}
        className="hero hero--mobile"
        role="banner"
        style={{ height: "100vh" }}
      >
        <canvas ref={mobileCanvasRef} className="hero__canvas" />

        <div className="hero__content-mobile">
          <h1 className="hero__title-mobile">TECH-Space</h1>
          <p className="hero__subtitle-mobile">
            Международный выставочный комплекс
          </p>
          <p className="hero__location-mobile">
            Тверская 9, Москва
          </p>

          <div className="hero__buttons-mobile">
            <Link
              href="https://tickets.art-space.world/#events"
              target="_blank"
            >
              Билеты
            </Link>
            <Link href="/events">Афиша</Link>
          </div>
        </div>
      </section>

      {/* DESKTOP */}
      <section
        ref={desktopSectionRef}
        className="hero hero--desktop"
        role="banner"
      >
        <canvas ref={desktopCanvasRef} className="hero__canvas" />

        <div className="text-swap-container">
          <p>ЛОКАЦИЯ: МОСКВА, ТВЕРСКАЯ 9</p>
          <h1>TECHSPACE MOSCOW</h1>
          <h3>Суверенное будущее</h3>
        </div>
      </section>
    </>
  );
}
