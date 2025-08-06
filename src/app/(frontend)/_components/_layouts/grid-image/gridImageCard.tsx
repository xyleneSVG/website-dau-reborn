'use client'

import Image, { StaticImageData } from 'next/image'
import React from 'react'

export default function GridImageCard({ image, description }: { image: string | StaticImageData; description: string }) {
  return (
    <div className="flex flex-col items-center flex-grow-0 w-full sm:w-[48%] lg:w-[30%]">
      <div className="relative w-full h-[180px] md:h-[200px] rounded-2xl overflow-hidden">
        <Image src={image} alt={description || ''} fill className="object-cover shadow-md" />
      </div>

      <p className="text-center text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] font-light mt-2 sm:mt-4">
        {description}
      </p>
    </div>
  )
}
