import React from 'react'
import { spectralBridgeRegular } from '@/fonts/font'

type Header = {
    text: string;
}

function Header6({ text }: Header) {
  return (
    <h1 className={`${spectralBridgeRegular.className} text-[clamp(1rem,4.5vw,2rem)] md:text-[4.5vw] lg:text-[2.7vw] text-lightText60 dark:text-darkText60`}>{text}</h1>
  )
}

export default Header6
