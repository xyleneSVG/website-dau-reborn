'use client'

import React from 'react'
import ListCard from "./listCard"
import { LucideIcon } from 'lucide-react'
import { ListWithIconAndDescriptionSection } from '@/payload-types'

interface ListWithIconProps {
  data: ListWithIconAndDescriptionSection
  getLucideIcon: (name?: string) => LucideIcon | null
}

export default function ListWithIconAndDescription({ data, getLucideIcon }: ListWithIconProps) {
  return (
    <section className="relative flex items-center justify-center p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30">
      <div
        className="absolute top-1/3 left-0 w-full h-1/3 -z-10"
        style={{ backgroundColor: data?.backgroundPageColor ?? '' }}
      />

      <div className="relative z-10 w-full md:w-[90%] lg:w-[80%] xl:w-[70%] mx-auto">
        <h2 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] font-light uppercase mb-4 sm:mb-6 md:mb-8 xl:mb-10 text-center">
          {data.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 xl:gap-10 px-2 sm:px-4">
          {Array.isArray(data?.contentLists) &&
            data.contentLists.map((item, index) => (
              <ListCard
                key={index}
                icon={item.contentIcon}
                title={item.contentName}
                description={item?.contentDescription}
                backgroundIconColor={data?.backgroundIconColor ?? ''}
                iconColor={data?.iconColor ?? ''}
                getLucideIcon={getLucideIcon}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
