"use client";
import React, { useRef } from "react";
import { spectralBridgeRegular } from "@/fonts/font";
import Image from "next/image";
import Paragraph from "../Paragraph";
import AboutMain from "../../../public/images/general/home/mradul-coding.png";
import { easeInOut, motion } from "framer-motion";

function Intro() {
  const line1 = "Turning innovative";
  const line2 = "ideas into products";

  const imageRef = useRef(null);

  const EASING = [0.83, 0, 0.17, 1];

  const rise1 = {
    initial: {
      y: "100%",
    },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: EASING,
        delay: 0.3,
      },
    },
  };
  
  const reveal = {
    initial: {
      height: "0%",
    },
    animate: {
      height: "auto",
      transition: {
        duration: 1,
        ease: EASING,
        delay: 0.45,
      },
    },
  };

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
    <section className="">
      <div className="flex justify-center mt-8 md:mt-[8vh]">
        <div className="w-full sm:w-[70%] lg:w-[65%] flex justify-center items-center flex-col">
          <div className="z-[10] dark:mix-blend-exclusion">
            <div className="overflow-hidden">
              <motion.h1
                variants={rise1}
                initial="initial"
                animate="animate"
                className={`${spectralBridgeRegular.className} dark:mix-blend-exclusion text-[clamp(2.35rem,10vw,5rem)] sm:text-[8vw] lg:text-[6.5vw] text-center leading-[1]`}
              >
                {line1}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                variants={rise1}
                initial="initial"
                animate="animate"
                className={`${spectralBridgeRegular.className} dark:mix-blend-exclusion text-[clamp(2.35rem,10vw,5rem)] sm:text-[8vw] lg:text-[6.5vw] text-center leading-[1]`}
              >
                {line2}
              </motion.h1>
            </div>
          </div>
          <div className="w-full sm:w-[80%] lg:w-[60%] mt-[-1rem] md:mt-[-5vh] lg:mt-[-6vh]">
            <motion.div
              variants={reveal}
              initial="initial"
              animate="animate"
                className="overflow-hidden object-cover object-top z-[0] rounded-[24px] md:rounded-[32px]"
            >
              <motion.div
                className=""
              >
                <Image
                  src={AboutMain}
                  alt="Mradul Garg working at a laptop"
                  className="w-full rounded-[24px] md:rounded-[32px]"
                  placeholder="blur"
                  ref={imageRef}
                />
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            variants={appear}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="w-[92%] sm:w-[65%] lg:w-[50%] mt-7"
          >
            <Paragraph
              text="All Power is Within You; You Can Do Anything And Everything"
              className="text-center"
            />
            <Paragraph text="- Swami Vivekananda" className="text-right mt-2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
