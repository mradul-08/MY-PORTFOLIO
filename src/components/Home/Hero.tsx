"use client";
import React, { useRef } from "react";
import Header1 from "../Header1";
import Header6 from "../Header6";
import Image from "next/image";
import StarSpin from "../StarSpin";
import Paragraph from "../Paragraph";
import HeroImage from "../../../public/images/general/home/mradul-portrait.jpeg";
import MainButton from "../MainButton";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {
  const star = useRef(null);

  useGSAP(() => {
    gsap.to(star.current, {
      y: "30%",
      rotate: 270,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: star.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  const headerVariant1 = {
    initial: {
      y: "100%",
    },
    animate: {
      y: 0,
      transition: {
        duration: 1.2,
        delay: 0.1,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const headerVariant2 = {
    initial: {
      y: "100%",
    },
    animate: {
      y: 0,
      transition: {
        duration: 1.2,
        delay: 0.25,
        ease: [0.25, 1, 0.5, 1],
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
        duration: 1.2,
        delay: 0.6,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const appear2 = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.7,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const appear3 = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.8,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const flash = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.9,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  return (
    <section className="py-8 xs:py-10 md:py-[8vh]">
      <div className="flex flex-col items-center">
        <div className="w-fit overflow-hidden">
          <motion.div
            variants={headerVariant1}
            initial="initial"
            animate="animate"
            className=""
          >
            <Header1 text="Mradul" />
          </motion.div>
        </div>
        <div className="w-fit overflow-hidden">
          <motion.div
            variants={headerVariant2}
            initial="initial"
            animate="animate"
            className=""
          >
            <Header1 text="Garg" />
          </motion.div>
        </div>
      </div>
      <motion.div
        variants={appear}
        initial="initial"
        animate="animate"
        className="flex flex-wrap justify-center items-center md:justify-end gap-x-5 sm:gap-x-[8em] gap-y-1 mt-5 md:pr-[6em]"
      >
        <Header6 text="Software Developer" />
        <Header6 text="Full Stack Developer" />
      </motion.div>
      <div className="mt-8 flex flex-col-reverse md:flex-row gap-8 md:gap-[8vw] items-start">
        <motion.div
          variants={flash}
          initial="initial"
          animate="animate"
          className="flex-1 flex justify-center md:justify-end origin-center"
        >
          <div className="w-fit" ref={star}>
            <StarSpin
            classNameSize="w-20 xs:w-24 sm:w-[15vw] md:w-[12vw]"
            />
          </div>
        </motion.div>
        <div className="w-full md:flex-[2.5] lg:flex-[1.5] flex flex-col xs:flex-row xs:mt-[4vh] md:mt-0 gap-8">
          <motion.div
            variants={appear2}
            initial="initial"
            animate="animate"
            className="mx-auto w-[68vw] min-w-[11rem] max-w-[17rem] xs:translate-x-0 md:mx-0 md:w-auto md:max-w-[40vw] md:pl-0 md:flex-[1.5] object-cover relative isolate"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -left-3 -top-3 z-0 h-10 w-10 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.8),rgba(172,72,0,.28)_45%,rgba(172,72,0,.08)_72%)] shadow-[4px_6px_12px_rgba(87,31,0,.18)] dark:bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.35),rgba(245,231,211,.2)_45%,rgba(245,231,211,.04)_72%)] dark:shadow-[4px_6px_12px_rgba(0,0,0,.32)]" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-3 -top-3 z-0 h-10 w-10 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.8),rgba(172,72,0,.28)_45%,rgba(172,72,0,.08)_72%)] shadow-[4px_6px_12px_rgba(87,31,0,.18)] dark:bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.35),rgba(245,231,211,.2)_45%,rgba(245,231,211,.04)_72%)] dark:shadow-[4px_6px_12px_rgba(0,0,0,.32)]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-3 -left-3 z-0 h-10 w-10 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.8),rgba(172,72,0,.28)_45%,rgba(172,72,0,.08)_72%)] shadow-[4px_6px_12px_rgba(87,31,0,.18)] dark:bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.35),rgba(245,231,211,.2)_45%,rgba(245,231,211,.04)_72%)] dark:shadow-[4px_6px_12px_rgba(0,0,0,.32)]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-3 -right-3 z-0 h-10 w-10 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.8),rgba(172,72,0,.28)_45%,rgba(172,72,0,.08)_72%)] shadow-[4px_6px_12px_rgba(87,31,0,.18)] dark:bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,.35),rgba(245,231,211,.2)_45%,rgba(245,231,211,.04)_72%)] dark:shadow-[4px_6px_12px_rgba(0,0,0,.32)]" />
            <Image
              src={HeroImage}
              alt="Mradul Garg working at a laptop"
              priority
              sizes="(max-width: 768px) 40vw, 25vw"
              quality={80}
              data-preload="true"
              className="relative z-10 w-full h-full rounded-[28px] object-cover shadow-[0_18px_35px_rgba(87,31,0,.22),inset_0_0_0_1px_rgba(255,255,255,.2)] dark:shadow-[0_18px_35px_rgba(0,0,0,.42),inset_0_0_0_1px_rgba(245,231,211,.15)]"
              placeholder="blur"
            />
          </motion.div>
          <motion.div
            variants={appear3}
            initial="initial"
            animate="animate"
            className="flex-[3] flex justify-end xs:items-end md:items-baseline py-0 md:py-0"
          >
            <div className="w-full xs:w-full">
              <div className="w-full sm:w-[80%] md:w-[60%]">
                <Paragraph
                  text="I build scalable full-stack applications and intelligent web experiences, turning complex ideas into products that are fast, reliable, and built to solve real problems. Explore my work, technical journey, and projects below."
                  className="text-[17px] sm:text-[20px] 2xl:text-[24px] leading-[1.5]"
                />
              </div>
              <div className="mt-3">
                <MainButton text="Learn More" link="/about" fontSize="text-[17px] sm:text-[18px]" classNameWidth="w-full max-w-[15rem]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
