'use client'

import Image from 'next/image'
import React from 'react'
import { Media, Page, TwoListWithIllustrationSection } from '@/payload-types'
import { LucideIcon } from 'lucide-react'

interface TwoListWithIllustrationProps {
  data: TwoListWithIllustrationSection
  getLucideIcon: (name?: string) => LucideIcon | null
}

export default function TwoListWithIllustration({
  data,
  getLucideIcon,
}: TwoListWithIllustrationProps) {
  const IconComponent = getLucideIcon?.(data?.buttonIcon ?? '')
  return (
    <div className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-92px)] lg:min-h-[calc(100vh-108px)] p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="text-center max-w-3xl">
        <h1 className="md:max-w-[600px] lg:max-w-[800px] xl:max-w-4xl 2xl:max-w-5xl text-[16px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] font-semibold text-black">
          {data.sectionTitle}
        </h1>
        <p className="md:max-w-[600px] lg:max-w-[800px] xl:max-w-4xl 2xl:max-w-5xl mt-3 md:mt-5 xl:mt-7 2xl:mt-10 text-black font-light text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[24px]">
          {data.sectionDescription}
        </p>
      </div>

      <div className="mt-14 w-full max-w-5xl 2xl:max-w-7xl flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 lg:gap-8 xl:gap-10">
          {/* Card */}
          <div className="w-full md:flex-[1] order-2 md:order-1 p-2 shadow-lg rounded-3xl">
            <div
              className={`rounded-3xl bg-white text-center h-full`}
              style={{ borderColor: data.leftSideListColor, borderWidth: 2 }}
            >
              <div
                className="text-white font-bold text-xl mb-4 py-6 rounded-t-2xl"
                style={{
                  backgroundColor: data.leftSideListColor,
                  color: data.leftSideListTitleColor,
                }}
              >
                {data?.leftSideListTitle}
              </div>
              <ul className="space-y-2 text-sm md:text-base text-gray-800 px-6 pb-6">
                {Array.isArray(data?.leftSideListContentArray) &&
                  data.leftSideListContentArray.map((item, index) => (
                    <li className="text-start" key={index}>
                      {item.leftSideListContent}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Image */}
          <div className="w-full md:flex-[2] order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              {(data.sectionIllustration as Media)?.url && (
                <Image
                  src={(data.sectionIllustration as Media).url ?? ''}
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
          </div>

          {/* Card */}
          <div className="w-full md:flex-[1] order-3 md:order-3 p-2 shadow-lg rounded-3xl">
            <div
              className={`rounded-3xl border-2 border-[${data.rightSideListColor}] bg-white text-center h-full`}
              style={{ borderColor: data.rightSideListColor, borderWidth: 2 }}
            >
              <div
                className="text-white font-bold text-xl mb-4 py-6 rounded-t-2xl"
                style={{
                  backgroundColor: data.rightSideListColor,
                  color: data.rightSideListTitleColor,
                }}
              >
                {data?.rightSideListTitle}
              </div>
              <ul className="space-y-2 text-sm md:text-base text-gray-800 px-6 pb-6">
                {Array.isArray(data?.rightSideListContentArray) &&
                  data.rightSideListContentArray.map((item, index) => (
                    <li className="text-start" key={index}>
                      {item.rightSideListContent}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {data.hasButton && (
        <div className="mt-6 sm:mt-10 lg:mt-10">
          <a
            href={(data.buttonLink as Page).pageKey || '#'}
            className="inline-flex items-center px-5 py-2 rounded-lg text-[12px] sm:text-[14px] lg:text-[18px] xl:text-[20px] border"
            style={{
              borderColor: data?.buttonColor ?? '',
              color: data?.buttonColor ?? '',
            }}
          >
            {data.buttonText}
            {IconComponent && <IconComponent className="ml-2 w-5 h-5" strokeWidth={2} />}
          </a>
        </div>
      )}
    </div>
  )
}
