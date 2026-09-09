"use client";
import React, { SetStateAction, useState } from "react";
import { processes } from "@/utils/process";
import { spectralBridgeRegular } from "@/fonts/font";
import Image from "next/image";
import Test from "../../../public/images/general/home/test.jpg";
import { easeInOut, motion } from "framer-motion";

function Process() {
  const [index, setIndex] = useState<number | undefined>();

  const curve = {
    initial: {
      borderTopLeftRadius: "0%",
    },
    animate: {
      borderTopLeftRadius: "100%",
      transition: {
        ease: [0.83, 0, 0.17, 1],
        duration: 1,
        delay: 0.7,
      },
    },
  };

  return (
    <section className="my-20 md:my-[20vh]">
      <div className="w-full md:w-[90%] mx-auto gap-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <motion.div
          variants={curve}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="px-5 py-5 rounded-xl rounded-tl-[38%] md:rounded-tl-[100%] flex items-end bg-lightText text-lightBg dark:bg-darkText dark:text-darkBg min-h-[9rem] sm:h-auto lg:h-[55vh]"
        >
          <h5 className="text-[2.5rem] md:text-[40px] 2xl:text-[60px]">PROCESS</h5>
        </motion.div>
        {processes.map((item, i) => {
          return item.title !== null ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { duration: 0.6, ease: easeInOut, delay: i * 0.06 },
              }}
              viewport={{ once: true }}
              key={item.title}
            >
              <ProcessList
                key={item.title}
                i={i}
                item={item}
                // click={changeIndex}
                setIndex={setIndex}
                index={index}
              />
            </motion.div>
          ) : (
            <div key={`item_${i}`} className="hidden xl:block"></div>
          );
        })}
        <div className="rounded-xl rounded-br-[38%] md:rounded-br-[100%] bg-lightText text-lightBg dark:bg-darkText dark:text-darkBg min-h-[9rem] sm:h-auto lg:h-[55vh]"></div>
      </div>
    </section>
  );
}

export default Process;

type List = {
  setIndex?: React.Dispatch<SetStateAction<number | undefined >>;
  index: number | undefined;
  i: number;
  click?: (i: number) => void;
  item: {
    title: string | null;
    description: string | null;
  };
};

function ProcessList({ setIndex, i, click, index, item }: List) {

  return (
    <div
      onMouseEnter={() => setIndex && setIndex(i)}
      onMouseLeave={() => setIndex && setIndex(undefined)}
      className={`${
        index === i
          ? "bg-lightText text-lightBg dark:bg-darkText dark:text-darkBg"
          : "bg-transparent text-lightText dark:text-darkText"
      } hover:bg-lightText dark:hover:bg-darkText hover:text-lightBg dark:hover:text-darkBg duration-300 rounded-xl min-h-[15rem] md:min-h-0 lg:h-[55vh] p-5 md:p-6 2xl:p-10 flex flex-col border-[1.5px] border-lightText dark:border-darkText`}
    >
      <h6 className="text-[1.65rem] md:text-[26px] 2xl:text-[48px] mb-8 lg:mb-0">{item.title}</h6>
      <div className={`${i === index ? "md:opacity-100" : "md:opacity-0"} opacity-100 duration-300 mt-auto mb-auto`}>
        <p className="text-[15px] leading-[1.5] sm:text-[16px] 2xl:text-[24px]">
          {item.description}
        </p>
      </div>
    </div>
  );
}
