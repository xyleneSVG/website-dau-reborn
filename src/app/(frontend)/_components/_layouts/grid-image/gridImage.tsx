'use client'

import React from 'react'
import GridImageCard from './gridImageCard'
import { GridImageSection, Media } from '@/payload-types'
import { RichTextRenderer } from '../../_richtext/richTextRenderer'
import defaultBanner from 'public/statis/default-banner.png'

interface Props {
  data: GridImageSection
}

export default function GridImage({ data }: Props) {
  const hasRichText = data.sectionTitle?.root?.children?.length ?? 0 > 0
  return (
    <div className="relative overflow-hidden pb-14 sm:pb-16 md:pb-18 lg:pb-20 xl:md:pb-24 2xl:pb-30">
      <div className="w-full text-center mx-auto mb-6 sm:mb-8 bg-[#E3F1FE] px-6 py-10 sm:py-12 lg:pt-16 xl:md:pt-20 2xl:pt-24 lg:pb-30 xl:pb-34 2xl:pb-40">
        <div className="text-start text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] 2xl:text-[40px] sm:pl-[1.5%] md:pl-[9.5%] lg:pl-[10%] xl:pl-[12%] 2xl:pl-[11.5%] font-light uppercase">
          {hasRichText && <RichTextRenderer content={data?.sectionTitle?.root} />}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 lg:gap-x-8 xl:gap-10 2xl:gap-12 gap-y-8 lg:gap-y-12 px-6 sm:px-8 lg:mt-[-100px] xl:mt-[-120px] md:max-w-[85%] xl:max-w-[80%] mx-auto">
        {Array.isArray(data.gridImage) &&
          data.gridImage.map((item, index) => (
            <GridImageCard key={index} image={(item?.image as Media)?.url || defaultBanner} description={item.imageDescription} />
          ))}
      </div>
    </div>
  )
}
