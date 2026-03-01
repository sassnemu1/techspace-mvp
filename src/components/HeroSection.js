"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_PX_PER_FRAME = 15;
const MAX_CONCURRENT = 10;
const BASE_PRELOAD_RADIUS = 36;
const MAX_PRELOAD_BOOST = 32;

// ─────────────────────────────────────────────
// Bitmap loader (через blob)
// ─────────────────────────────────────────────
async function loadBitmap(url) {
  const res = await fetch(url, { priority: "high" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const blob = await res.blob();
  return createImageBitmap(blob);
}

// ─────────────────────────────────────────────
// Пул загрузки
// ─────────────────────────────────────────────
function createPriorityPool(concurrency) {
  let active = 0;
  const high = [];
  const normal = [];

  function next() {
    if (active >= concurrency) return;
    const job = high.shift() || normal.shift();
    if (!job) return;

    active++;
    job().finally(() => {
      active--;
      next();
    });
  }

  return {
    high(task) {
      high.push(task);
      next();
    },
    normal(task) {
      normal.push(task);
      next();
    },
  };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function HeroSection({ frameCount }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const cache = useRef(new Map());
  const inflight = useRef(new Set()); // кадры в процессе загрузки
  const progressRef = useRef(0);
  const displayedFrame = useRef(0);
  const lastProgress = useRef(-1);

  const poolRef = useRef(null);
  const tickerRef = useRef(null);

  const [ready, setReady] = useState(false);

  const frameUrl = (i) =>
    `/seq/output_${String(i).padStart(4, "0")}.webp`;

  // ─────────────────────────────────────────────
  // Canvas
  // ─────────────────────────────────────────────
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    ctxRef.current = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
  }, []);

  const drawFrame = useCallback((bitmap) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || !bitmap) return;

    const vw = canvas.width;
    const vh = canvas.height;

    const cr = vw / vh;
    const ir = bitmap.width / bitmap.height;

    let dw, dh, dx, dy;

    if (ir > cr) {
      dh = vh;
      dw = dh * ir;
      dx = (vw - dw) / 2;
      dy = 0;
    } else {
      dw = vw;
      dh = dw / ir;
      dx = 0;
      dy = (vh - dh) / 2;
    }

    ctx.drawImage(bitmap, dx, dy, dw, dh);
  }, []);

  // ─────────────────────────────────────────────
  // Загрузка кадра с приоритетом
  // ─────────────────────────────────────────────
  const requestFrame = useCallback((index, priority = "normal") => {
    if (cache.current.has(index)) return;
    if (inflight.current.has(index)) return; // уже грузится — не дублируем

    inflight.current.add(index);

    const task = async () => {
      try {
        const bitmap = await loadBitmap(frameUrl(index));
        cache.current.set(index, bitmap);
      } catch (e) {
        console.warn("Frame error:", e.message);
      } finally {
        inflight.current.delete(index); // снимаем метку в любом случае
      }
    };

    poolRef.current[priority](task);
  }, []);

  // ─────────────────────────────────────────────
  // Preload вокруг target
  // ─────────────────────────────────────────────
  const preloadAround = useCallback(
    (center, velocity) => {
      const dynamicRadius =
        BASE_PRELOAD_RADIUS +
        Math.min(MAX_PRELOAD_BOOST, Math.floor(velocity * 90));

      const start = Math.max(1, center - dynamicRadius);
      const end = Math.min(frameCount, center + dynamicRadius);

      for (let i = start; i <= end; i++) {
        requestFrame(i, "normal");
      }
    },
    [frameCount, requestFrame]
  );

  // ─────────────────────────────────────────────
  // Ticker (идеально синхронизирован с RAF)
  // ─────────────────────────────────────────────
  const setupTicker = useCallback(() => {
    if (tickerRef.current) return;

    tickerRef.current = () => {
      const progress = progressRef.current;

      // ранний выход если прогресс не изменился
      if (progress === lastProgress.current) return;

      const velocity = Math.abs(progress - lastProgress.current);
      lastProgress.current = progress;

      const target = Math.max(
        1,
        Math.min(
          frameCount,
          Math.round(1 + progress * (frameCount - 1))
        )
      );

      if (target !== displayedFrame.current) {
        if (!cache.current.has(target)) {
          requestFrame(target, "high");
        }

        const bitmap = cache.current.get(target);
        if (bitmap) {
          drawFrame(bitmap);
          displayedFrame.current = target;
        }
      }

      preloadAround(target, velocity);
    };

    gsap.ticker.add(tickerRef.current);
  }, [frameCount, drawFrame, requestFrame, preloadAround]);

  // ─────────────────────────────────────────────
  // Init
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768)
      return;

    initCanvas();
    poolRef.current = createPriorityPool(MAX_CONCURRENT);

    requestFrame(1, "high");

    const checkFirst = setInterval(() => {
      if (cache.current.has(1)) {
        drawFrame(cache.current.get(1));
        displayedFrame.current = 1;
        setReady(true);
        clearInterval(checkFirst);
      }
    }, 16);

    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
      gsap.ticker.remove(tickerRef.current);
      cache.current.forEach((bm) => bm.close());
      cache.current.clear();
      inflight.current.clear();
    };
  }, [initCanvas, requestFrame, drawFrame]);

  // ─────────────────────────────────────────────
  // ScrollTrigger
  // ─────────────────────────────────────────────
  useGSAP(() => {
    if (!ready) return;

    setupTicker();

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${frameCount * SCROLL_PX_PER_FRAME}`,
      pin: true,
      scrub: false,
      onUpdate(self) {
        progressRef.current = self.progress;
      },
    });

    return () => {
      st.kill();
    };
  }, { scope: sectionRef, dependencies: [ready, frameCount, setupTicker] });

  return (
    <section ref={sectionRef} className="hero hero--desktop">
      {!ready && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
          <p>Загрузка...</p>
        </div>
      )}

      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="text-swap-container">
        <p>ЛОКАЦИЯ: МОСКВА, ТВЕРСКАЯ 9</p>
        <h1>TECHSPACE MOSCOW</h1>
        <h3>Суверенное Будущее</h3>
      </div>
    </section>
  );
}