import React from 'react'
import { spectralBridgeRegular } from '@/fonts/font'

type Header = {
    text: string;
}

function Header1({ text }: Header) {
  return (
    // USED FOR HERO SECTION
    <h1 className={`${spectralBridgeRegular.className} whitespace-nowrap text-[16vw] leading-[1] mb-[-.25em]`}>{text}</h1>
  )
}

export default Header1
