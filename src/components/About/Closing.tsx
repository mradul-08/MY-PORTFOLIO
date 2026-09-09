"use client";
import React from "react";
import Header3 from "../Header3";
import { easeInOut, motion } from "framer-motion";

function Closing() {
  const line1 = "Most of my world is built with code,";
  const line2 = "I keep handball and cricket around to";
  const line3 = "experience a world that can’t be simulated";
  const line4 = "— movement, reaction, competition, and";
  const line5 = "the unpredictability of real things.";
  const lineClassName = "w-full !text-[clamp(2rem,4vw,4rem)]";

  const appear = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeInOut,
        delay: 0.4,
      },
    },
  };

  return (
    <section className="mt-[8vh] mb-[4vh] sm:my-[5vh] md:my-[8vh]">
      <div className="flex flex-col gap-6 md:flex-row md:gap-[6vw]">
        <p className="shrink-0 text-[13px] uppercase tracking-[0.18em] text-lightText80 dark:text-darkText80 md:w-[12vw] md:pt-2 md:text-[16px]">
          More than code
        </p>
        <div className="min-w-0 flex-1">
          <Header3 phrase={line1} className={lineClassName} />
          <Header3 phrase={line2} className={lineClassName} />
          <Header3 phrase={line3} className={lineClassName} />
          <Header3 phrase={line4} className={lineClassName} />
          <Header3 phrase={line5} className={lineClassName} />
        </div>
      </div>

      <motion.div
        variants={appear}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex mt-10"
      >
        <div className="flex-1 hidden md:block"></div>
        <div className="flex-[2]" />
      </motion.div>
    </section>
  );
}

export default Closing;
