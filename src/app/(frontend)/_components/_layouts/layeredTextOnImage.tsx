'use client'

import Image from 'next/image'
import React from 'react'

import { LayeredTextOnImageSection, Media } from '@/payload-types'

interface Props {
  data: LayeredTextOnImageSection
}

export default function LayeredTextOnImage({ data }: Props) {
  return (
    <div className="w-full min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-92px)] lg:min-h-[calc(100vh-108px)] relative overflow-hidden">
      {(data?.sectionBackground as Media)?.url && (
        <Image
          src={(data.sectionBackground as Media).url ?? ""}
          alt={data.sectionTitle || ''}
          fill
          className="object-cover z-0"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/20 z-10" />

      <div className="absolute inset-0 z-20 flex justify-center lg:justify-end items-center p-6 sm:p-8 md:pr-12 min-2xl:pr-20">
        <div className="text-center lg:max-w-[50%]">
          <q className="text-white text-[18px] sm:text-[20px] md:text-[28px] lg:text-[32px] xl:text-[48px] 2xl:text-[64px] font-bold uppercase leading-snug">
            {data.sectionTitle}
          </q>
          <p className="text-white mt-4 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[32px] 2xl:text-[40px] tracking-[0.4em] font-light uppercase">
            {data.sectionSubtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
