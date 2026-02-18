// components/ScrollSmootherWrapper.jsx - СОЗДАЙТЕ НОВЫЙ КОМПОНЕНТ
"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';{ }
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function ScrollSmootherWrapper({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  const pathname = usePathname();
  const disableSmooth = pathname.startsWith('/events/');

  useEffect(() => {
    // if (disableSmooth) return;

    let smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5, 
      normalizeScroll: true, 
      ignoreMobileResize: true,
      effects: false 
    });

    return () => {
      if (smoother) smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
