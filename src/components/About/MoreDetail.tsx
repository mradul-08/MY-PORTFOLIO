"use client";

import React, { useRef } from "react";
import Image from "next/image";
import AboutImage1 from "../../../public/images/general/about/akgec-campus-portrait.png";
import AboutImage2 from "../../../public/images/general/about/tech-journey-portrait.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { easeInOut, motion } from "framer-motion";

function MoreDetail() {
  const image1 = useRef(null);
  const image2 = useRef(null);

  useGSAP(() => {
    gsap.to(image1.current, {
      y: "10%",
      scrollTrigger: {
        trigger: image1.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(image2.current, {
      y: "10%",
      scrollTrigger: {
        trigger: image2.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

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

  const bodyClass = "text-[13.5px] sm:text-[15px] 2xl:text-[24px]";

  return (
    <section className="mt-[5vh]">
      <div className="flex flex-col md:flex-row items-end gap-6 md:pl-[8vw]">
        <div className="w-full flex-1 object-cover overflow-hidden">
          <h2
            className="w-full text-center text-[16px] md:text-[20px] uppercase tracking-wide mb-3"
          >
            My College
          </h2>
          <Image
            src={AboutImage1}
            alt="AKGEC campus building under a blue sky"
            className="w-full h-full scale-110"
            placeholder="blur"
            ref={image1}
          />
        </div>
        <div className="flex-[1.5]">
          <div className="w-full md:w-[72%] object-cover">
            <h2 className="w-full text-center text-[16px] md:text-[20px] uppercase tracking-wide mb-3">
              My Tech Journey
            </h2>
            <div className="w-full overflow-hidden">
              <Image
                src={AboutImage2}
                alt="Mradul presenting his CodeVerse project to a team"
                className="w-full h-auto scale-100"
                placeholder="blur"
                ref={image2}
              />
            </div>
          </div>
          <div className="mt-[4vh]">
            <h2 className="tracking-tighter text-[10vw] md:text-[7vw] leading-[1] uppercase">
              Persistence
            </h2>
            <h2 className="tracking-tighter text-[10vw] md:text-[7vw] leading-[1] uppercase">
              &amp; Motivation
            </h2>
          </div>
        </div>
      </div>
      <motion.div
        variants={appear}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-x-[5vw] mt-8 md:mt-[8vh] pr-0 pl-[8vw] md:pr-[6vw] md:pl-0"
      >
        <div className="flex-1 hidden md:block"></div>
        <div className="flex-1">
          <div>
            <p className={bodyClass}>
              I’m interested in technology beyond writing code. I like understanding how an interface connects to an API, how data moves through a system, and how individual technical decisions eventually shape the product as a whole.
            </p>
          </div>
          <div className="mt-6">
            <p className={bodyClass}>
              My Computer Science journey at <strong>Ajay Kumar Garg Engineering College</strong> has given me the fundamentals, while building outside the classroom has pushed me to explore the practical side of engineering — from programming and problem-solving to full-stack development, real-time systems, cloud infrastructure, and AI.
            </p>
          </div>
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <div>
            <p className={bodyClass}>
              What keeps me interested is the depth behind every layer. <strong>Learning a framework is useful; understanding why it works, where it breaks, and how to use it effectively</strong> is what actually makes me better. That mindset has become more important to me than simply collecting technologies.
            </p>
          </div>
          <div className="mt-6">
            <p className={bodyClass}>
              I’m constantly trying to close the gap between <strong>knowing something and being able to build with it</strong>. For me, engineering is that continuous loop of learning, experimenting, debugging, and improving — with every project giving me a better understanding of what I can build next.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default MoreDetail;
