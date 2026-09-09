"use client"
import React from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Scroll({children}: { readonly children: React.ReactNode}) {
  return (
    <>
      {children}
    </>
  )
}

export default Scroll
