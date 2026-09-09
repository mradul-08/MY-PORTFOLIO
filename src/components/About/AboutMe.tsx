import React from "react";
import Header3 from "../Header3";

function AboutMe() {
  const line1 = "I’m Mradul Garg, a Full Stack Developer focused on technology, problem-solving, and building useful digital products."
  const line2 = "Currently pursuing B.Tech in Computer Science at Ajay Kumar Garg Engineering College"

  return (
    <section className="mt-[8vh] pt-[6vh] border-t-[1px] border-t-lightText20 dark:border-t-darkText20">
      <div className="flex flex-col md:flex-row gap-x-[8vw] gap-y-6">
        <p className={`text-[14px] md:text-[18px]`}>
          About me
        </p>
        <div className="flex-1">
          <Header3 phrase={line1} className="indent-[6%] !text-[clamp(1.8rem,3.6vw,3.6rem)]"/>
          <Header3 phrase={line2} className="!text-[clamp(1.8rem,3.6vw,3.6rem)]"/>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
