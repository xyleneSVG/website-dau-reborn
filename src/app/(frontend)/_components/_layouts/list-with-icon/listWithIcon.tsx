'use client'
import React from 'react'
import ListCard from './listCard'
import { ListWithIconSection } from '@/payload-types'
import { LucideIcon } from 'lucide-react'

interface ListWithIconProps {
  data: ListWithIconSection
  getLucideIcon: (name?: string) => LucideIcon | null
}

export default function ListWithIcon({ data, getLucideIcon }: ListWithIconProps) {
  return (
    <section className="relative flex items-center justify-center p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30">
      <div
        className="absolute top-0 left-0 w-full h-1/2 -z-10"
        style={{ backgroundColor: data?.backgroundPageColor ?? '' }}
      />

      <div className="relative z-10 max-w-full md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%]">
        <h2 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] font-light uppercase mb-4 sm:mb-6 md:mb-8 xl:mb-10 text-center">
          {data.sectionTitle}
        </h2>
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 lg:p-10 xl:p-14 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-x-10 lg:gap-y-14">
            {Array.isArray(data?.contentLists) &&
              data.contentLists.map((item, index) => (
                <ListCard
                  key={index}
                  icon={item.contentIcon}
                  title={item.contentName}
                  getLucideIcon={getLucideIcon}
                  backgroundIconColor={data?.backgroundIconColor ?? ''}
                  iconColor={data?.iconColor ?? ""}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
