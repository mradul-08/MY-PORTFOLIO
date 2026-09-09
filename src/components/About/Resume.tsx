"use client";
import React, { useRef } from "react";
import { items } from "@/utils/resume";
import Paragraph from "../Paragraph";
import { motion, useInView, easeInOut } from "framer-motion";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mradul-garg-972ab7339/",
    icon: "in",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Mradul_Garg/",
    icon: "LC",
  },
  {
    label: "GitHub",
    href: "https://github.com/mradul-08",
    icon: "gh",
  },
];

function Resume() {
  const titleRef = useRef(null);
  const title = useInView(titleRef, { once: true });

  const EASING = [0.83, 0, 0.17, 1];

  const rise = {
    initial: {
      y: "100%",
    },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: EASING,
        delay: 0.4,
      },
    },
  };

  return (
    <section className="mt-12 md:mt-[6vh]">
      <div
        className="border-b-[1px] border-b-lightText20 dark:border-b-darkText20 md:border-none"
        ref={titleRef}
      >
        {items.map((item, l) => {
          return (
            <div
              className="flex flex-col md:flex-row gap-3 md:gap-5 border-t-[1px] border-t-lightText20 dark:border-t-darkText20 md:border-none"
              key={item.category}
            >
              <div className="flex-1 py-5">
                <div className="overflow-hidden">
                  <motion.div
                    variants={rise}
                    initial="initial"
                    animate={title && "animate"}
                  >
                    <Paragraph text={item.category} />
                  </motion.div>
                </div>
              </div>
              <div
                className={`flex-[3] md:border-t-[1px] md:border-t-lightText20 md:dark:border-t-darkText20 ${
                  l === items.length - 1 &&
                  "md:border-b-[1px] md:border-b-lightText20 md:dark:border-b-darkText20"
                  } px-0 py-4 md:px-3 md:py-5`}
              >
                {item.list.map((list, i) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{
                        opacity: 1,
                        transition: {
                          duration: 0.8,
                          ease: easeInOut,
                          delay: i * 0.1,
                        },
                      }}
                      viewport={{ once: true }}
                      key={list.institution}
                      className={`${
                        i !== item.list.length - 1 ? "mb-8" : "mb-0"
                      } flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`}
                    >
                      <div>
                        <p className="text-[16px] md:text-[18px]">
                          {list.institution}{list.location ? <>, <span className="italic">{list.location}</span></> : null}
                        </p>
                        <div>
                          <p className="text-[12px] md:text-[13.5px]">
                            {list.role || [list.primary_qualification, list.primary_concentration].filter(Boolean).join(", ")}
                          </p>
                          {list.secondary_concentration ? (
                            <p className="text-[12px] md:text-[13.5px]">{`${list.secondary_qualification}, ${list.secondary_concentration}`}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="w-full shrink-0 text-left text-[13px] md:w-auto md:text-right md:text-[16px]">
                        {(list.website || list.github) ? (
                        <div className="mb-2 flex flex-wrap items-center justify-start gap-x-4 gap-y-2 text-left text-[13px] md:justify-end md:text-right md:text-[15px]">
                            {list.website ? (
                              <a
                                href={list.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-lightText underline underline-offset-4 hover:text-lightText80 dark:text-darkText dark:hover:text-darkText80"
                              >
                                Live website ↗
                              </a>
                            ) : null}
                            {list.github ? (
                              <a
                                href={list.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-lightText underline underline-offset-4 hover:text-lightText80 dark:text-darkText dark:hover:text-darkText80"
                              >
                                GitHub ↗
                              </a>
                            ) : null}
                          </div>
                        ) : null}
                        {list.cgpa ? <p>CGPA: {list.cgpa}</p> : null}
                        {list.duration ? <p>{list.duration}</p> : null}
                        {list.cgpa ? (
                            <div className="mt-3 flex justify-start md:justify-end">
                            <a
                              href="https://drive.google.com/file/d/1vZF4FCP8Hd4m3f4wlkKWbgqLZ7oqWpfB/view?usp=sharing"
                              target="_blank"
                              rel="noreferrer"
                              className="flex h-[2.5em] w-[10em] items-center justify-center rounded-full border border-lightText text-[14px] text-lightText transition-colors hover:bg-lightText hover:text-lightBg dark:border-darkText dark:text-darkText dark:hover:bg-darkText dark:hover:text-darkBg"
                            >
                              Check Result
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 text-lightText dark:text-darkText">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              title={social.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-lightText text-[12px] font-semibold transition-colors hover:bg-lightText hover:text-lightBg dark:border-darkText dark:hover:bg-darkText dark:hover:text-darkBg"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="flex h-[2.75rem] w-full overflow-hidden rounded-full border border-lightText text-lightText dark:border-darkText dark:text-darkText sm:w-auto">
          <a
            href="https://drive.google.com/file/d/1Q71F6DRaAROseaHPC_N_QqDavQ-AZfq4/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="flex min-w-0 flex-1 items-center justify-center px-4 text-[15px] transition-colors hover:bg-lightText hover:text-lightBg dark:hover:bg-darkText dark:hover:text-darkBg sm:min-w-[9em] sm:flex-none"
          >
            View Resume
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1Q71F6DRaAROseaHPC_N_QqDavQ-AZfq4"
            target="_blank"
            rel="noreferrer"
            aria-label="Download resume"
            title="Download resume"
            className="flex w-12 shrink-0 items-center justify-center border-l border-lightText transition-colors hover:bg-lightText hover:text-lightBg dark:border-darkText dark:hover:bg-darkText dark:hover:text-darkBg"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
