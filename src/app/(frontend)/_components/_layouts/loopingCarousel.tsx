'use client'

import React from 'react'
import { LoopingCarouselSection, Media } from '@/payload-types'

interface Props {
  data: LoopingCarouselSection
}

export default function LoopingCarousel({ data }: Props) {
  return (
    <div className="w-full p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30">
      <h1 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] text-black font-light uppercase mb-4 sm:mb-6 md:mb-8 xl:mb-10 text-center">
        {data.sectionTitle}
      </h1>

      <div className="md:w-[80%] lg:w-[95%] border border-[#CECFDB] py-4 sm:py-6 md:py-8 xl:py-10 2xl:py-12 overflow-hidden rounded-2xl mx-auto">
        <div className="relative w-full">
          <div className="flex scroll-container">
            {Array.isArray(data?.carouselLists) &&
              [...data.carouselLists, ...data.carouselLists].map((img, index) => (
                <div key={index} className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8 xl:mx-10">
                  <div className="w-16 md:w-20 lg:w-24 xl:w-28 flex items-center justify-center">
                    {(img?.itemImage as Media)?.url && (
                      <img
                        src={(img.itemImage as Media).url ?? ''}
                        alt={img.id ?? ''}
                        className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain"
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
