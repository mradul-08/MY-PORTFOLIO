"use client";
import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisGsapSync() {
  const lenis = useLenis(() => {
    // ScrollTrigger must receive Lenis' interpolated position, not only the
    // browser's native scroll event.
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    // One animation clock prevents Lenis and GSAP from drifting apart.
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

function LenisScroll({ children }: { children: React.ReactNode}) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.95,
      }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}

export default LenisScroll;
