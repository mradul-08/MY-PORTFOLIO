"use client";
import React, { useRef } from "react";
import { spectralBridgeRegular } from "@/fonts/font";
import Image1 from "../../../public/images/general/home/about_image4.jpg";
import Image2 from "../../../public/images/general/home/codeverse-genweb-apps.png";
import Image from "next/image";
import Paragraph from "../Paragraph";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { easeInOut, motion, useInView } from "framer-motion";
import Image3 from "../../../public/images/general/home/codeverse-genweb-workspace.png"
import Header3 from "../Header3";

function About() {
  const image1 = useRef(null);
  const image2Div = useRef(null);
  const image2 = useRef(null);

  const topRef = useRef(null);
  const top = useInView(topRef, { once: true });

  useGSAP(() => {
    gsap.to(image1.current, {
      y: "10%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: image1.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    var tl = gsap.timeline({
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: image2Div.current,
        start: "top bottom",
        end: "+=3000px",
        scrub: true,
      },
    });

    tl.from(image2Div.current, {
      yPercent: 10,
    }).to(image2Div.current, {
      yPercent: -5,
    });
  });

  const topline1 = "You see the interface.";
  const topline2 = "I see everything behind it.";
  const bottomline1 = "Requests. Data. Logic. Systems.";
  const bottomline2 = "That’s where I like to build.";

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
    <section className="py-16 md:py-[15vh]">
      <div>
        <div className="">
          <Header3 phrase={topline1} className="pr-0 !text-[clamp(2rem,8vw,3.6rem)] md:pr-[15vw] md:!text-[clamp(2rem,3.6vw,3.6rem)]"/>
          <Header3 phrase={topline2} className="pr-0 !text-[clamp(2rem,8vw,3.6rem)] md:pr-[8vw] md:!text-[clamp(2rem,3.6vw,3.6rem)]"/>
        </div>
        <div className="">
        <Header3 phrase={bottomline1} className="pl-0 !text-[clamp(2rem,8vw,3.6rem)] md:pl-[8vw] md:!text-[clamp(2rem,3.6vw,3.6rem)]"/>
        <Header3 phrase={bottomline2} className="pl-0 !text-[clamp(2rem,8vw,3.6rem)] md:pl-[20vw] md:!text-[clamp(2rem,3.6vw,3.6rem)]"/>
        </div>
      </div>
      <div className="mt-10 flex flex-col-reverse md:flex-row md:items-center gap-y-4 md:gap-y-0">
        <div className="aspect-[4/5] md:flex-1 md:aspect-[1206/1304] object-cover object-center overflow-hidden rounded-2xl md:rounded-none">
          <Image
            src={Image3}
            alt="CodeVerse and GenWeb.ai workspace with a laptop"
            className="w-full h-full object-cover md:object-contain"
            quality={100}
            sizes="(min-width: 992px) 45vw, 100vw"
            ref={image1}
            placeholder="blur"
          />
        </div>
        <div className="md:flex-1 flex justify-center items-center">
          <div
            className="aspect-[4/5] w-full h-full md:w-[70%] md:aspect-[1200/1310] object-cover object-left-top overflow-hidden rounded-2xl md:rounded-none"
            ref={image2Div}
          >
            <Image
              src={Image2}
              alt="CodeVerse and GenWeb.ai mobile application interfaces"
              className="w-full h-full object-cover md:object-contain"
              quality={100}
              sizes="(min-width: 992px) 32vw, 100vw"
              ref={image2}
              placeholder="blur"
            />
          </div>
        </div>
      </div>
      <motion.div
        className="flex mt-10 md:mt-8"
        variants={appear}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="xs:flex-[1] hidden xs:block"></div>
        <div className="xs:flex-[2.5] md:flex-[1.2] grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-12 items-start">
          <div className="flex flex-col gap-3 border-t border-lightText20 dark:border-darkText20 pt-4">
        <h3 className="font-bold text-[19px] md:text-[24px]">CodeVerse</h3>
      <Paragraph text="CodeVerse brings the entire interview journey under one roof — where algorithms meet aptitude, practice meets competition, and preparation meets real-time collaboration. It’s designed as a connected system rather than another collection of problem sheets, giving developers a place to practice, measure progress, compete, collaborate, and experience the pressure of real interviews." />
          </div>
          <div className="flex flex-col gap-3 border-t border-lightText20 dark:border-darkText20 pt-4">
            <h3 className="font-bold text-[19px] md:text-[24px]">GenWeb.ai</h3>
            <Paragraph text="GenWeb.ai explores what happens when the starting point of web development is no longer code, but an idea. Describe the website you have in mind, let AI translate that intent into a real interface, then iterate on the result until it feels right. It brings prompting, generation, editing, preview, and deployment closer together in one workflow." />
          </div>
          {/* Legacy template copy removed. */}
          {false && (<>
          <div className="flex-1">
            <Paragraph text="As a designer and creative developer, I prioritize aesthetics and functionality, implementing foundational SEO practices to build traffic. When sifting through my projects, you might find a bit of my personality in my designs. I like to put personal touches to my works, leading them to stand out amongst other websites. " />
          </div>
          <div className="flex-1">
            <div className="">
              <Paragraph text="This subsequentally helps to separate my clients from other competitors. I lead with empathy to create a sense of comfort for my clients, especially small businesses that are still building and might not have it all figured out yet. Quality will always come before quantity. " />
            </div>
          </div>
          </>)}
        </div>
      </motion.div>
    </section>
  );
}

export default About;
