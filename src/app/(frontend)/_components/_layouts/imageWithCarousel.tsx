'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import background1 from 'public/statis/imageWithCarousel/background1.svg'
import background2 from 'public/statis/imageWithCarousel/background2.svg'

import { ImageWithCarouselSection, Media } from '@/payload-types'

interface Props {
  data: ImageWithCarouselSection
}

export default function ImageWithCarousel({ data }: Props) {
  const [visibleCount, setVisibleCount] = useState(3)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [clonedItems, setClonedItems] = useState<any[]>([])
  const [isSliding, setIsSliding] = useState(false)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateVisibleCount = () => {
    const width = window.innerWidth
    if (width >= 768) setVisibleCount(5)
    else if (width >= 640) setVisibleCount(4)
    else setVisibleCount(3)
  }

  useEffect(() => {
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  useEffect(() => {
    const items = Array.isArray(data.carouselImage) ? data.carouselImage : []
    const prefix = items.slice(-visibleCount)
    const suffix = items.slice(0, visibleCount)
    setClonedItems([...prefix, ...items, ...suffix])
    setCurrentIndex(visibleCount)
  }, [data.carouselImage, visibleCount])

  const slide = (dir: 'left' | 'right') => {
    if (isSliding) return
    setIsSliding(true)
    setTransitionEnabled(true)
    setCurrentIndex((prev) => (dir === 'left' ? prev - 1 : prev + 1))
  }

  const handleTransitionEnd = () => {
    setIsSliding(false)
    if (currentIndex >= clonedItems.length - visibleCount) {
      setTransitionEnabled(false)
      setCurrentIndex(visibleCount)
    } else if (currentIndex === 0) {
      setTransitionEnabled(false)
      setCurrentIndex(clonedItems.length - 2 * visibleCount)
    }
  }

  return (
    <div
      className={`relative p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30 overflow-hidden`}
      style={{ backgroundColor: data.backgroundColor }}
    >
      <Image
        src={background1}
        alt=""
        className="absolute top-0 right-0 w-[230px] md:w-[420px] lg:w-[540px] 2xl:w-[730px] z-1"
      />
      <Image
        src={background2}
        alt=""
        className="absolute bottom-0 left-0 w-[230px] md:w-[420px] lg:w-[540px] 2xl:w-[730px] z-1"
      />

      <div className="w-full">
        <div className="relative flex flex-col justify-center gap-y-20 z-3">
          <div className="text-center flex flex-col gap-y-2.5">
            <h1 className="font-light text-[18px] sm:text-[20px] md:text-[28px] lg:text-[32px] xl:text-[48px] 2xl:text-[64px] uppercase">
              {data.sectionTitle}
            </h1>
            <p className="font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] max-w-md mx-auto lg:max-w-[610px] 2xl:max-w-[980px]">
              {data.sectionDescription}
            </p>
          </div>
          {(data.sectionIllustration as Media)?.url && (
            <Image
              width={0}
              height={0}
              src={(data.sectionIllustration as Media).url ?? ""}
              alt=""
              className="w-max h-auto mx-auto sm:w-[440px] lg:w-[560px] xl:w-[740px] 2xl:w-[850px]"
            />
          )}

          <div className="flex items-center justify-center gap-x-4 lg:gap-x-6 2xl:gap-x-8">
            {clonedItems.length > visibleCount && (
              <button
                onClick={() => slide('left')}
                className="w-6 h-6 rounded-full bg-[#00DB05] flex items-center justify-center lg:w-10 lg:h-10 2xl:w-14 2xl:h-14"
              >
                <ChevronLeft className="text-white w-4 h-4 lg:w-8 lg:h-8" />
              </button>
            )}

            <div className="overflow-hidden w-[75%] sm:w-[70%] md:w-[60%] xl:w-[55%]">
              <div
                ref={containerRef}
                className="flex"
                style={{
                  width: `${(clonedItems.length * 100) / visibleCount}%`,
                  transform: `translateX(-${(currentIndex * 100) / clonedItems.length}%)`,
                  transition: transitionEnabled ? 'transform 0.3s ease' : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {clonedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / clonedItems.length}%` }}
                  >
                    <div className="size-14 rounded-2xl bg-white flex justify-center items-center sm:size-16 lg:size-20 xl:size-23 2xl:size-32 mx-auto">
                      {(item?.itemImage as Media)?.url && (
                        <Image
                          src={(item?.itemImage as Media)?.url ?? ''}
                          alt={''}
                          width={40}
                          height={40}
                          className="w-6 h-auto sm:w-10 xl:w-12 2xl:w-16"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {clonedItems.length > visibleCount && (
              <button
                onClick={() => slide('right')}
                className="w-6 h-6 rounded-full bg-[#00DB05] flex items-center justify-center lg:w-10 lg:h-10 2xl:w-14 2xl:h-14"
              >
                <ChevronRight className="text-white w-4 h-4 lg:w-8 lg:h-8" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
