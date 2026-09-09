"use client";

import React, { useState, useEffect } from "react";
import PreLoading from "./PreLoading";
import Hero from "./Hero";
import Services from "./Services";
import Works from "./Works";
import About from "./About";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Process from "./Process";
import FooterTransition from "./FooterTransition";
import ProcessParagraph from "./ProcessParagraph";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

function MainPage() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();

    const waitForImage = (image: HTMLImageElement) => {
      if (image.complete && image.naturalWidth > 0) {
        return image.decode?.().catch(() => undefined) ?? Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          image.removeEventListener("load", finish);
          image.removeEventListener("error", finish);
          resolve();
        };

        image.addEventListener("load", finish, { once: true });
        image.addEventListener("error", finish, { once: true });
        window.setTimeout(finish, 8000);
      });
    };

    const preloadImages = async () => {
      // The page is mounted underneath the loader, so every image is already
      // available here, including the images in the sticky service stack.
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      const images = Array.from(document.images).filter(
        (image) => image.dataset.preload === "true"
      );

      await Promise.all(images.map(waitForImage));
      ScrollTrigger.refresh();

      // Keep the opening animation intentional without making it wait longer
      // than necessary for already-cached images.
      const minimumDuration = 1200;
      const remaining = Math.max(0, minimumDuration - (performance.now() - startedAt));
      window.setTimeout(() => {
        if (cancelled) return;
        setCount(0);

        // Warm the remaining images after the first paint in small idle batches.
        // They are cached before the user reaches them without blocking Lenis.
        const remainingImages = Array.from(document.images).filter(
          (image) => image.dataset.preload !== "true"
        );
        let index = 0;
        const warmBatch = () => {
          remainingImages.slice(index, index + 2).forEach((source) => {
            const warm = new window.Image();
            warm.decoding = "async";
            warm.src = source.currentSrc || source.src;
          });
          index += 2;
          if (index < remainingImages.length && !cancelled) {
            const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 200));
            idle(warmBatch);
          }
        };
        warmBatch();
      }, remaining);
    };

    void preloadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (count !== 0 || !window.location.hash) return;

    const targetId = window.location.hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [count]);

  return (
    <>
      <PreLoading count={count} />
      <div
        className={`px-[6vw] transition-opacity duration-500 ${
          count > 0 ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden={count > 0}
      >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Works />
            <Services />
            <ProcessParagraph/>
            <Process/>
            <FooterTransition/>
          </main>
          <Footer />
      </div>
    </>
  );
}

export default MainPage;
