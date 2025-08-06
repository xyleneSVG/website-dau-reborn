'use client'

import React from 'react'
import { CardWithImageSection, Media } from '@/payload-types'
import CardWithImageComponent from './cardWithImageComponent'
import defaultBanner from 'public/statis/default-banner.png'

interface Props {
  data: CardWithImageSection
}

export default function CardWithImage({ data }: Props) {
  return (
    <section className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-92px)] lg:min-h-[calc(100vh-108px)] flex flex-col justify-center items-center relative pb-14 sm:pb-16 md:pb-18 lg:pb-20 xl:md:pb-24 2xl:pb-30 overflow-hidden">
      <div
        className="w-full text-center mx-auto mb-6 sm:mb-8 px-6 pt-14 sm:pt-16 md:pt-18 lg:pt-20 xl:md:pt-24 2xl:pt-30 pb-14 sm:pb-16 lg:pb-30 xl:pb-34 2xl:pb-40"
        style={{ backgroundColor: data?.headerColor }}
      >
        <div className="text-center text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] 2xl:text-[40px] font-light uppercase">
          {data.sectionTitle}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 lg:gap-x-8 xl:gap-10 2xl:gap-12 gap-y-8 lg:gap-y-12 px-6 sm:px-8 lg:mt-[-100px] xl:mt-[-120px] md:max-w-[85%] xl:max-w-[80%] mx-auto">
        {Array.isArray(data.cardArray) &&
          data.cardArray.map((item, index) => (
            <CardWithImageComponent
              key={index}
              image={(item?.itemThumbnail as Media)?.url ?? defaultBanner}
              title={item.itemTitle}
              description={item.itemDescription}
            />
          ))}
      </div>
    </section>
  )
}
