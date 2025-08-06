'use client'

import Image from 'next/image'
import React from 'react'
import type { LucideIcon } from 'lucide-react'

import { TextWithImageClusterSection, Media, Page } from '@/payload-types'
import { RichTextRenderer } from '../_richtext/richTextRenderer'

import backgroundIcon2 from 'public/statis/service/backgroundIcon2.svg'

interface Props {
  data: TextWithImageClusterSection
  getLucideIcon: (name?: string) => LucideIcon | null
}

export default function TextWithImageCluster({ data, getLucideIcon }: Props) {
  const {
    sectionHeadline,
    sectionTitle,
    sectionDescription,
    imageLists,
    reverseContent,
    hasBackground,
    backgroundColor,
    hasButton,
    buttonColor,
    buttonText,
    buttonIcon,
    buttonLink,
  } = data

  let IconComponent
  if (buttonIcon !== null) {
    IconComponent = getLucideIcon?.(buttonIcon)
  }

  return (
    <div
      className="w-full relative min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-92px)] lg:min-h-[calc(100vh-108px)] flex items-center justify-center p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30"
      style={{
        ...(hasBackground
          ? { backgroundColor: backgroundColor || '#ffffff' }
          : {
              backgroundImage: `url(${backgroundIcon2.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top right',
              backgroundSize: 'contain',
            }),
      }}
    >
      <div
        className={`container mx-auto flex flex-col ${
          reverseContent ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } items-center gap-4 md:gap-10 xl:gap-14 2xl:gap-20`}
      >
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-4 md:gap-6 mb-0">
          {imageLists?.length > 0 && (
            <div className="w-[70%] sm:w-[50%] lg:w-full rounded-2xl lg:rounded-4xl overflow-hidden">
              {(imageLists[0]?.itemImage as Media)?.url && (
                <Image
                  src={(imageLists[0].itemImage as Media).url ?? ''}
                  alt="Image"
                  width={800}
                  height={0}
                  priority
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          )}
          <div className="w-[70%] sm:w-[50%] lg:w-full flex justify-between flex-wrap">
            {imageLists?.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="w-[48%] h-[70px] sm:h-[100px] lg:h-[120px] xl:h-[150px] 2xl:h-[180px] aspect-[3/2] relative rounded-2xl overflow-hidden"
              >
                {(img?.itemImage as Media)?.url && (
                  <Image
                    src={(img.itemImage as Media).url ?? ''}
                    alt={`Image ${idx + 1}`}
                    fill
                    priority
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="italic text-[18px] md:text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[48px] mb-2 font-extralight">
            {sectionHeadline}
          </p>
          <h2 className="font-bold text-black text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] mb-4 mt-[20px] xl:mt-[35px]">
            {sectionTitle}
          </h2>
          <div className="text-black whitespace-pre-line mb-6 sm:mb-8 md:mb-10 text-[12px] sm:text-[14px] lg:text-[18px] xl:text-[20px] font-light text-justify">
            <RichTextRenderer content={sectionDescription?.root} />
          </div>

          {hasButton && (
            <a
              href={(buttonLink as Page)?.pageKey || '#'}
              className="inline-flex items-center px-5 py-2 rounded-lg text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] border"
              style={{
                borderColor: buttonColor ?? "",
                color: buttonColor ?? "",
              }}
            >
              {buttonText}
              {IconComponent && <IconComponent className="ml-2 lg:ml-4 w-5 h-5" strokeWidth={2} />}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
