"use client";

import React, { Fragment, useState } from "react";
import { Projects } from "@/types/type";
import Image from "next/image";
import { satoshiLight, spectralBridgeRegular } from "@/fonts/font";
import { motion } from "framer-motion";
import Link from "next/link";
import Banner from "../Banner";

type Work = {
  readonly work: Projects;
};

function IndividualWork({ work }: Work) {
  const [isHovered, setIsHovered] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  function windowMouse(e: React.MouseEvent<HTMLDivElement>) {
    setX(e.clientX);
    setY(e.clientY);
  }

  const imagePreview = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={windowMouse}
      className={`${
        isHovered ? "cursor-none" : "cursor-default"
      } relative isolate aspect-[4/3] w-full overflow-hidden object-cover group`}
    >
      <WorkHover x={x} y={y} isHovered={isHovered} />
      {work?.mainImage && (
        <Image
          src={work.mainImage}
          alt={`${work?.title} project`}
          className="h-full w-full object-cover duration-500 md:group-hover:scale-105"
          placeholder="blur"
          sizes="(max-width: 991px) 100vw, 30vw"
        />
      )}
    </div>
  );
  // ${
  //     work.id === 0 || work.id === 3
  //     ? "md:translate-x-[-2vw]"
  //     : "md:translate-x-[4vw]"
  // }

  return (
    <div
      className={`flex min-w-0 justify-center ${
        work?.id === 1 ? "md:justify-start" : work?.position
      } ${work.id === 0 || work.id === 3 ? "mb-0 md:mb-[10vw]" : "mb-0 md:mb-[15vw]"}`}
    >
      <div
        className="w-full min-w-0 sm:max-w-[60vw] md:max-w-[30vw]"
      >
        {work.website ? (
          <a
            href={work.website}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${work.title} live project`}
          >
            {imagePreview}
          </a>
        ) : (
          <Link href={`/works/${work?.title?.toLowerCase()}`}>
            {imagePreview}
          </Link>
        )}
        <div className="mt-3 flex flex-row-reverse justify-between items-start gap-3">
          <p className="shrink-0 text-[13px]">{work?.year}</p>
          <h5 className={`${spectralBridgeRegular.className} text-[clamp(1.8rem,8vw,2.25rem)] leading-none md:text-[36px]`}>
            {work?.title}
          </h5>
        </div>
        <div className="flex gap-x-3 gap-y-2 items-center flex-wrap mt-[-5px]">
          {work?.roles?.map((role) => {
            return (
              <div key={role} className="capitalize">
                <Banner text={role}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WorkHover({
  isHovered,
  x,
  y,
}: {
  isHovered: boolean;
  x: number;
  y: number;
}) {
  return (
    <motion.div
      initial={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.5 : 1 }}
      animate={{
        opacity: isHovered ? 1 : 0,
        scale: isHovered ? 1 : 0.5,
        x: x,
        y: y,
      }}
      transition={{ duration: 0.5 }}
      className={`${
        isHovered ? "visible" : "invisible"
      } hidden md:flex z-[88] fixed top-0 left-0 pointer-events-none justify-center items-center w-[9em] h-[9em] rounded-full bg-lightText text-lightBg dark:bg-darkText dark:text-darkBg`}
    >
      <div className="overflow-hidden">
        <div className="flex flex-nowrap gap-8 animate-carousel">
          {[
            "View Work",
            "View Work",
            "View Work",
            "View Work",
            "View Work",
            "View Work",
            "View Work",
            "View Work",
            "View Work",
          ].map((word, i) => {
            return (
              <p
                key={`${word}_${i}`}
                className={`${satoshiLight.className} whitespace-nowrap text-[20px]`}
              >
                {word}
              </p>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default IndividualWork;
