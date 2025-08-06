'use client'

import Image, { StaticImageData } from 'next/image'
import React from 'react'

export default function CardWithImageComponent({
  image,
  title,
  description,
}: {
  image: string | StaticImageData
  title: string
  description: string
}) {
  return (
    <div className="w-full sm:w-[48%] lg:w-[30%] bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className="relative w-full h-40 md:h-48">
        <Image
          src={image}
          alt={title || ''}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 md:p-6">
        <h3 className="font-semibold text-center text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] mb-2">{title}</h3>
        <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] font-light">{description}</p>
      </div>
    </div>
  )
}
