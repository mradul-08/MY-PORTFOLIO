import React from 'react'

type Text = {
    text: string;
    className?: string;
}

function Paragraph({ text, className }: Text) {
  return (
    <p className={`${className ? className : 'text-[15px] leading-[1.5] md:text-[13.5px] 2xl:text-[24px]'}`}>{text}</p>
  )
}

export default Paragraph
