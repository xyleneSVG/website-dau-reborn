'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

// Interfaces
import { ImageHeaderParagraphSection, Media } from '@/payload-types'
import { RichTextRenderer } from '../_richtext/richTextRenderer'

interface Props {
  data: ImageHeaderParagraphSection
}

export default function ImageHeaderParagraph({ data }: Props) {
  const hasImage = (data?.sectionImage as Media)?.url
  const hasTitle = data.sectionTitle
  const children = data?.sectionParagraph?.root?.children
  const hasParagraph = Array.isArray(children) && children.length > 0

  const imageRef = useRef<HTMLImageElement | null>(null)
  const [imageHeight, setImageHeight] = useState(0)

  useEffect(() => {
    if (imageRef.current) {
      const { height } = imageRef.current.getBoundingClientRect()
      setImageHeight(height / 2) // karena pakai translate-y-1/2
    }
  }, [])

  return (
    <div
      style={{ marginTop: `${imageHeight}px` }}
      className="flex justify-center items-center p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30 bg-[#E3F1FE] relative"
    >
      {hasImage && (
        <Image
          ref={imageRef}
          src={(data?.sectionImage as Media)?.url ?? ""}
          alt="section image"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[200px] xl:w-[250px] 2xl:w-[290px]"
        />
      )}
      <div className="max-w-[1000px] text-center">
        {hasTitle && (
          <h1 className="text-black text-[18px] sm:text-[20px] md:text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[48px] font-light mb-3 md:mb-5 xl:mb-7 2xl:mb-10 uppercase text-wrap">
            {data.sectionTitle}
          </h1>
        )}
        {hasParagraph && <RichTextRenderer content={data?.sectionParagraph?.root} />}
      </div>
    </div>
  )
}
