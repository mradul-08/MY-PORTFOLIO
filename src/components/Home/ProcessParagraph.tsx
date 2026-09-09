import React from "react";
import Header3 from "../Header3";

function ProcessParagraph() {
  const topline1 = "I seek to maintain a";
  const topline2 = "seamless experience for";
  const bottomline1 = "my clients, offering the best results";
  const bottomline2 = "that satisfies their business needs ";
  const bottomline3 = "and increases traffic.";
  return (
    <section className="my-20 md:my-[15vh]">
      <div className="w-full md:w-[90%] mx-auto md:ml-auto md:mr-0">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-[8vw]">
          <p className="text-[12.5px] sm:text-[16px]">My mission</p>
          <div>
            <Header3 phrase={topline1} className="w-full !text-[clamp(1.8rem,5vw,5.5rem)]" />
            <Header3 phrase={topline2} className="w-full !text-[clamp(1.8rem,5vw,5.5rem)]" />
          </div>
        </div>
        <div>
          <Header3 phrase={bottomline1} className="w-full !text-[clamp(2rem,5vw,5.5rem)]" />
          <Header3 phrase={bottomline2} className="w-full !text-[clamp(2rem,5vw,5.5rem)]" />
          <Header3 phrase={bottomline3} className="w-full !text-[clamp(2rem,5vw,5.5rem)]" />
        </div>
      </div>
    </section>
  );
}

export default ProcessParagraph;
