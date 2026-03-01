"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import HeroSectionLite from "@/components/HeroSectionLite"; 

export default function HeroAdaptive() {
  const [isPowerful, setIsPowerful] = useState(null);

  const data = {
    mode: "sequence",
    frameCount: 243,
  };

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;
    const ram = navigator.deviceMemory || 4;

    const strong = cores >= 8 && ram >= 8;

    let frames = 0;
    const start = performance.now();

    const testFPS = () => {
      frames++;
      if (performance.now() - start < 1000) {
        requestAnimationFrame(testFPS);
      } else {
        const fps = frames;
        setIsPowerful(strong || fps > 30);
      }
    };

    requestAnimationFrame(testFPS);
  }, []);

  if (isPowerful === null) return null;

  return isPowerful ? <HeroSection frameCount={data.frameCount} /> : <HeroSection frameCount={data.frameCount} />;
}
