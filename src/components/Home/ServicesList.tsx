"use client";
import React, { forwardRef, Fragment } from "react";
import { Services } from "@/types/type";
import Paragraph from "../Paragraph";
import { spectralBridgeRegular } from "@/fonts/font";
import { allServices } from "@/utils/services";
import StarSpin from "../StarSpin";
import Banner from "../Banner";
import Image from "next/image";
import type { StaticImageData } from "next/image";

type List = {
  services: Services;
  mobileImage?: StaticImageData;
  mobileImageAlt?: string;
  preloadImage?: boolean;
};

const ServicesList = forwardRef<HTMLDivElement, List>(({ services, mobileImage, mobileImageAlt, preloadImage = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`px-0 py-16 md:px-3 md:py-8 ${
        services.id !== allServices.length &&
        "border-b-[1px] border-b-lightText20 dark:border-b-darkText20"
      } flex flex-col min-h-0 md:min-h-[65vh]`}
    >
      <div className="flex items-center gap-3 md:gap-8">
        <StarSpin classNameSize="w-8 md:w-[36px] 2xl:w-[50px]" />
        <h6
          className={`${spectralBridgeRegular.className} text-[clamp(1.55rem,7.5vw,2.25rem)] md:text-[36px] 2xl:text-[50px] leading-[1.05]`}
        >
          {services.title}
        </h6>
      </div>
      <div className="mt-10 md:mt-[10vh] xs:pl-[10vw] md:pl-0">
        <div className="w-full sm:w-[85%] md:w-full xl:w-[80%]">
          <div className="flex flex-wrap gap-x-2.5 gap-y-2">
            {services.skillsLabel && (
                <p className="basis-full mb-1 text-[17px] sm:text-[20px] 2xl:text-[22px] font-semibold">
                {services.skillsLabel}
              </p>
            )}
            {services.technologies.map((tech) => {
              return (
                <Fragment key={tech}>
                  <Banner text={tech.charAt(0).toUpperCase() + tech.slice(1)} />
                </Fragment>
              );
            })}
          </div>
          <div className="mt-4">
            <p className="text-[16px] sm:text-[20px] 2xl:text-[26px] leading-[1.55] text-lightText80 dark:text-darkText80">
              {services.description}
            </p>
          </div>
          {mobileImage ? (
            <div
              className="mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-lightText20 bg-lightText20 dark:border-darkText20 dark:bg-darkText20 md:hidden"
            >
              <Image
                src={mobileImage}
                alt={mobileImageAlt ?? `${services.title} project image`}
                className="h-full w-full object-cover"
                placeholder="blur"
                priority={preloadImage}
                quality={70}
                sizes="(max-width: 991px) 100vw, 0px"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default ServicesList;
