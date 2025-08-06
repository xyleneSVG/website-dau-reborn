import Image from 'next/image'
import React from 'react'

import ColumnCard from './columnCard'
import { ImageHeaderThreeColumnSection, Media } from '@/payload-types'

interface Props {
  data: ImageHeaderThreeColumnSection
}

export default function ImageHeaderThreeColumn({ data }: Props) {
  const hasImage = (data?.sectionHeaderImage as Media)?.url
  const hasTitle = data?.sectionTitle
  const hasSubtitle = data?.sectionSubtitle
  const hasGridLists = data?.gridLists && data?.gridLists?.length > 0

  return (
    <div className="">
      <div className="relative w-full h-[100px] sm:h-[120px] md:h-[160px] lg:h-[250px] xl:h-[300px] 2xl:h-[400px]">
        {hasImage && (
          <Image
            src={(data?.sectionHeaderImage as Media)?.url ?? ""}
            alt={data?.sectionTitle}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {hasTitle && (
            <h1 className="text-[#00DB05] text-[18px] md:text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[48px] font-bold uppercase">
              {data.sectionTitle}
            </h1>
          )}
          {hasSubtitle && (
            <p className="text-white text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] mt-[10px] font-bold tracking-[0.35em] uppercase">
              {data.sectionSubtitle}
            </p>
          )}
        </div>
      </div>
      {hasGridLists && (
        <div className="relative z-10 flex flex-wrap justify-center gap-[20px] xl:gap-[30px] 2xl:gap-[50px] justify-items-center px-6 sm:px-8 md:px-12 min-2xl:px-20 pb-14 sm:pb-16 md:pb-18 lg:pb-20 xl:md:pb-24 2xl:pb-30 mt-[20px] md:mt-[-3%] lg:mt-[-4%]">
          {data?.gridLists?.map((item, index) => (
            <ColumnCard key={index} title={item.itemTitle} description={item.itemDescription} />
          ))}
        </div>
      )}
    </div>
  )
}
