"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spectralBridgeRegular } from "@/fonts/font";

type Header = {
  phrase: string,
  className?: string
}

function Header3({ phrase, className }: Header) {
  const topRef = useRef(null);
  const top = useInView(topRef, { once: true });

  const EASING = [0.83, 0, 0.17, 1]
  const DELAY = 0.006

  return (
    <h3
      ref={topRef}
      className={`${spectralBridgeRegular.className} text-[clamp(2rem,5.5vw,6rem)] leading-[1.08] overflow-hidden ${className ?? ""}`}
    >
      {phrase.trim().split(/\s+/).map((word, wordIndex, words) => {
        return (
          <span
            key={`word_${wordIndex}`}
            className={`inline-block whitespace-nowrap ${wordIndex < words.length - 1 ? "mr-[0.45em]" : ""}`}
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                initial={{ y: "100%", rotateZ: 5 }}
                animate={
                  top && {
                    y: 0,
                    rotateZ: 0,
                    transition: {
                      duration: 0.6,
                      delay: (wordIndex * 10 + letterIndex) * DELAY,
                      ease: EASING,
                    },
                  }
                }
                key={`${wordIndex}_${letter}_${letterIndex}`}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        );
      })}
    </h3>
  );
}

export default Header3;
