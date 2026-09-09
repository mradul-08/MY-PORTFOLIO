"use client";
import React, { useRef } from "react";
import Top1 from "../../../public/images/services/top1.png";
import Top2 from "../../../public/images/services/top2.png";
import Bottom1 from "../../../public/images/services/bottom1.png";
import Bottom2 from "../../../public/images/services/bottom2.jpg";
import Bottom3 from "../../../public/images/services/bottom3.jpg";
import Service1 from "../../../public/images/services/list/problem-solving.png";
import Service2 from "../../../public/images/services/list/full-stack-development.png";
import Service3 from "../../../public/images/services/list/systems-production.png";
import Service4 from "../../../public/images/services/list/ai-engineering.png";
import Header2 from "../Header2";
import Image from "next/image";
import ServiceImage from "../../../public/images/services/list/john-gonzales-bcPmxdBGyyw-unsplash.jpg";
import ServicesList from "./ServicesList";
import { allServices } from "@/utils/services";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

function Services() {
  const serviceDiv = useRef(null);
  const topImage1 = useRef(null);
  const topImage2 = useRef(null);
  const bottomImage1 = useRef(null);
  const bottomImage2 = useRef(null);
  const bottomImage3 = useRef(null);

  const serviceRef1 = useRef(null);
  const serviceRef2 = useRef(null);
  const serviceRef3 = useRef(null);
  const serviceRef4 = useRef(null);

  const serviceImage1 = useRef(null);
  const serviceImage2 = useRef(null);
  const serviceImage3 = useRef(null);
  const serviceImage4 = useRef(null);

  const serviceRef = [serviceRef1, serviceRef2, serviceRef3, serviceRef4];
  const serviceImage = [
    serviceImage1,
    serviceImage2,
    serviceImage3,
    serviceImage4,
  ];

  const image = useRef(null);

  useGSAP(() => {
    gsap.to(image.current, {
      y: "25%",
      scrollTrigger: {
        trigger: image.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  useGSAP(() => {
    gsap.from(topImage1.current, {
      y: "40%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: serviceDiv.current,
        start: "top bottom",
        end: "bottom -80%",
        scrub: true,
      },
    });
    gsap.from(topImage2.current, {
      y: "50%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: serviceDiv.current,
        start: "top bottom",
        end: "bottom -30%",
        scrub: true,
      },
    });
    gsap.from(bottomImage1.current, {
      y:"-40%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: serviceDiv.current,
        start: "top 120%",
        end: "bottom -100%",
        scrub: true,
      },
    });
    gsap.from(bottomImage2.current, {
      y: "-45%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: serviceDiv.current,
        start: "top 50%",
        end: "bottom -80%",
        scrub: true,
      },
    });
    gsap.from(bottomImage3.current, {
      y: "-35%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: serviceDiv.current,
        start: "top 135%",
        end: "bottom -105%",
        scrub: true,
      },
    });

    const activateServiceImage = (index: number) => {
      serviceImage.forEach((ref, currentIndex) => {
        if (!ref.current) return;

        gsap.set(ref.current, { zIndex: currentIndex === index ? 10 : 0 });
        gsap.to(ref.current, {
          autoAlpha: currentIndex === index ? 1 : 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    serviceImage.forEach((ref, i) => {
      const trigger = serviceRef[i]?.current;
      if (!ref.current || !trigger) return;

      gsap.set(ref.current, {
        autoAlpha: i === 0 ? 1 : 0,
        zIndex: i === 0 ? 10 : 0,
      });

      gsap.to(ref.current, {
        autoAlpha: i === 0 ? 1 : 0,
        duration: 0.35,
        scrollTrigger: {
          trigger,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => activateServiceImage(i),
          onEnterBack: () => activateServiceImage(i),
          onLeaveBack: () => activateServiceImage(Math.max(0, i - 1)),
        },
      });
    });
  });

  const topImages = [
    {
      alt: "laptop sitting on a cozy desk",
      image: Top1,
      ref: topImage1,
      label: "think",
      labelBelow: false,
    },
    {
      alt: "phone against a rock and branch",
      image: Top2,
      ref: topImage2,
      label: "review",
      labelBelow: false,
    },
  ];

  const bottomImages = [
    {
      alt: "a laptop sitting on the edge of a wooden chair",
      image: Bottom1,
      ref: bottomImage1,
      label: "developing",
      labelBelow: false,
    },
    {
      alt: "aesthetic sculpture with sky blue wall background",
      image: Bottom2,
      ref: bottomImage2,
      label: "erase errors",
      labelBelow: true,
    },
    {
      alt: "a blue door surrounded by stone wall",
      image: Bottom3,
      ref: bottomImage3,
      label: "deep into code",
      labelBelow: false,
    },
  ];

  const serviceImages = [
    {
      id: "service1",
      image: Service1,
      zIndex: "z-[1]",
      alt: "problem-solving workspace with C, C++, and JavaScript code",
    },
    {
      id: "service2",
      image: Service2,
      zIndex: "z-[2]",
      alt: "full-stack development system with frontend, backend, database, and deployment layers",
    },
    {
      id: "service3",
      image: Service3,
      zIndex: "z-[3]",
      alt: "systems production architecture with laptop, servers, and connected tools",
    },
    {
      id: "service4",
      image: Service4,
      zIndex: "z-[4]",
      alt: "AI engineering workspace with laptop, AI books, and robot",
    },
  ];

  return (
    <section className="mb-[8vh] pt-[6vh]" id="skills">
      {/* SERVICE HEADER WITH SURROUNDING IMAGES */}
      <div className="mb-[10vh]" ref={serviceDiv}>
        <div className="flex justify-evenly items-end">
          {topImages.map((img) => {
            return (
              <div
                key={img.alt}
                className="w-[11vw] xs:w-[12vw] sm:w-[13vw] md:w-[10vw] object-cover object-center"
                ref={img.ref}
              >
                {img.label && !img.labelBelow && (
                  <p className="mb-1 text-center text-[9px] sm:text-[11px] uppercase tracking-[0.22em] text-lightText dark:text-darkText">
                    {img.label}
                  </p>
                )}
                <Image
                  src={img.image}
                  alt={img.alt}
                  placeholder="blur"
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mb-[5vh]">
          <Header2 text="skills" />
        </div>
        <div className="flex justify-between sm:justify-around items-start">
          {bottomImages.map((img) => {
            return (
              <div
                key={img.alt}
                className="w-[11vw] xs:w-[12vw] sm:w-[13vw] md:w-[10vw] object-cover object-center"
                ref={img.ref}
              >
                {img.label && !img.labelBelow && (
                  <p className="mb-1 text-center text-[9px] sm:text-[11px] uppercase tracking-[0.22em] text-lightText dark:text-darkText">
                    {img.label}
                  </p>
                )}
                <Image
                  src={img.image}
                  alt={img.alt}
                  placeholder="blur"
                  className="w-full h-full"
                />
                {img.label && img.labelBelow && (
                  <p className="mt-1 text-center text-[9px] sm:text-[11px] uppercase tracking-[0.22em] text-lightText dark:text-darkText">
                    {img.label}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* LISTED SERVICES*/}
      <div className="flex justify-end">
        <motion.div className="relative flex flex-col-reverse md:flex-row gap-4 border-t-[1px] border-b-[1px] border-t-lightText20 dark:border-t-darkText20 border-b-lightText20 dark:border-b-darkText20">
          <div className="flex-1 ">
            {allServices.map((item, i) => {
              return (
                <motion.div key={item.title}>
                  <ServicesList services={item} ref={serviceRef[i]} />
                </motion.div>
              );
            })}
          </div>
          <div className="relative md:sticky top-0 flex-1 h-auto md:h-screen object-cover overflow-hidden">
            <Image
              src={ServiceImage}
              alt="two spanish buildings with blue sky"
              className="w-full h-full scale-150"
              placeholder="blur"
              data-preload="true"
              ref={image}
            />
            <div>
              {serviceImages.map((img, i) => {
                return (
                  <motion.div
                    ref={serviceImage[i]}
                    className={`${
                      i === 0 ? "opacity-100" : "opacity-0"
                    } absolute transform translate-x-[-50%] translate-y-[-50%] top-1/2 
                    left-1/2 w-[40%] md:w-[50%] lg:w-[40%] 2xl:w-[50%] h-[20%] 2xl:h-[30%] object-cover`}
                    key={img.id}
                  >
                    <Image
                      src={img.image}
                      alt={img.alt}
                      className="w-full h-full"
                      priority
                      loading="eager"
                      data-preload="true"
                      sizes="(max-width: 768px) 40vw, (max-width: 1536px) 25vw, 30vw"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
