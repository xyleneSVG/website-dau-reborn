import React from 'react'
import { TextAlignCenterSection } from '@/payload-types'

export default function TextAlignCenter({data}: {data: TextAlignCenterSection}) {
  return (
    <div className='p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30 w-full sm:w-[85%] mx-auto'>
        <h1 className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] mb-4 sm:mb-6 md:mb-8 xl:mb-10 font-semibold text-center uppercase'>{data.sectionTitle}</h1>
        <p className='text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[24px] font-light text-justify md:text-center'>{data.sectionDescription}</p>
    </div>
  )
}
