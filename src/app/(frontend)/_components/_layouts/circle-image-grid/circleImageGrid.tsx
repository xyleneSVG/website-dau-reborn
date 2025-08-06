'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

import backgroundIcon2 from 'public/statis/service/backgroundIcon2.svg'
import backgroundIcon3 from 'public/statis/service/backgroundIcon3.svg'
import defaultProfile from 'public/statis/default-profile.png'

// components
import GridCard from './gridCard'

// interfaces
import { CircleImageGridSection, Media } from '@/payload-types'

interface props {
  data: CircleImageGridSection
}

export default function CircleImageGrid({ data }: props) {
  const [visibleCount, setVisibleCount] = useState(1)
  const [cardWidth, setCardWidth] = useState(0)
  const [index, setIndex] = useState(0)
  const [minItemsToShowButton, setMinItemsToShowButton] = useState(2)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const total = data?.gridLists?.length ?? 0

  const maxIndex = Math.max(0, total - visibleCount)
  const shouldShowButtons = total >= minItemsToShowButton

  const hasTitle = data.sectionTitle
  const hasGrid = data.gridLists && data.gridLists.length > 0

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth
      let count = 1
      let minItems = 2

      if (width >= 1024) {
        count = 3
        minItems = 4
      } else if (width >= 640) {
        count = 2
        minItems = 3
      }

      setVisibleCount(count)
      setMinItemsToShowButton(minItems)

      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        setCardWidth(containerWidth / count)
      }

      setIndex(0)
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  useEffect(() => {
    if (cardWidth === 0) return
    controls.start({
      x: -index * cardWidth,
      transition: { duration: 0.4 },
    })
  }, [index, cardWidth])

  const next = () => {
    if (!shouldShowButtons || index >= maxIndex) return
    setIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prev = () => {
    if (!shouldShowButtons || index <= 0) return
    setIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div className="p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30 relative">
      <Image
        priority
        width={0}
        height={0}
        src={backgroundIcon2}
        alt=""
        className="absolute top-0 right-0 w-[240px] h-auto -z-10 md:w-[420px] 2xl:w-[620px]"
      />
      <Image
        priority
        width={0}
        height={0}
        src={backgroundIcon3}
        alt=""
        className="absolute bottom-0 left-0 w-[240px] h-auto -z-10 md:w-[420px] 2xl:w-[620px]"
      />

      {hasTitle && (
        <h1 className="text-[18px] md:text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[48px] font-light uppercase mb-6 text-center">
          {data.sectionTitle}
        </h1>
      )}

      <div
        className="relative w-full overflow-hidden mt-[20px] sm:mt-[30px] md:mt-[40px] lg:mt-[60px] xl:mt-[80px] 2xl:mt-[100px]"
        ref={containerRef}
      >
        {shouldShowButtons && (
          <button
            onClick={prev}
            disabled={index <= 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 ${
              index <= 0 ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <svg
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] lg:w-[50px] lg:h-[50px]"
            >
              <path
                d="M28.4926 14.2462C28.4926 18.0245 26.9916 21.6481 24.3199 24.3198C21.6482 26.9914 18.0246 28.4924 14.2463 28.4924C12.3754 28.4924 10.5229 28.1239 8.79447 27.4079C7.06603 26.692 5.49553 25.6426 4.17264 24.3198C1.50094 21.6481 0 18.0245 0 14.2462C0 10.4679 1.50094 6.84429 4.17264 4.17261C6.84434 1.50093 10.4679 0 14.2463 0C16.1171 0 17.9697 0.368488 19.6981 1.08443C21.4266 1.80036 22.9971 2.84973 24.3199 4.17261C25.6428 5.49549 26.6922 7.06598 27.4082 8.7944C28.1241 10.5228 28.4926 12.3753 28.4926 14.2462ZM25.6433 14.2462C25.6433 11.2235 24.4426 8.32467 22.3052 6.18732C20.1679 4.04998 17.269 2.84924 14.2463 2.84924C11.2236 2.84924 8.32473 4.04998 6.18737 6.18732C4.05001 8.32467 2.84926 11.2235 2.84926 14.2462C2.84926 17.2688 4.05001 20.1677 6.18737 22.305C8.32473 24.4424 11.2236 25.6431 14.2463 25.6431C17.269 25.6431 20.1679 24.4424 22.3052 22.305C24.4426 20.1677 25.6433 17.2688 25.6433 14.2462ZM19.09 20.7994L12.5367 14.2462L19.09 7.69294L17.0956 5.69847L8.54778 14.2462L17.0956 22.7939L19.09 20.7994Z"
                fill={index <= 0 ? '#CECFDB' : '#00DB05'}
              />
            </svg>
          </button>
        )}

        <motion.div className="flex" animate={controls}>
          {hasGrid &&
            data?.gridLists?.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="shrink-0"
                style={{ width: `${100 / visibleCount}%` }}
              >
                <div className="flex justify-center items-center h-full px-2 sm:px-3 md:px-4">
                  <GridCard
                    title={item.itemName}
                    description={item.itemDescription}
                    photo={(item?.itemImage as Media)?.url ?? defaultProfile}
                  />
                </div>
              </div>
            ))
          }
        </motion.div>

        {shouldShowButtons && (
          <button
            onClick={next}
            disabled={index >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 ${
              index >= maxIndex ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <svg
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] lg:w-[50px] lg:h-[50px]"
            >
              <path
                d="M28.9997 14.2462C28.9997 18.0245 27.4987 21.6481 24.827 24.3198C22.1553 26.9914 18.5317 28.4924 14.7534 28.4924C12.8825 28.4924 11.03 28.1239 9.30155 27.4079C7.57311 26.692 6.00261 25.6426 4.67972 24.3198C2.00802 21.6481 0.50708 18.0245 0.50708 14.2462C0.50708 10.4679 2.00802 6.84429 4.67972 4.17261C7.35142 1.50093 10.975 0 14.7534 0C16.6242 0 18.4768 0.368488 20.2052 1.08443C21.9336 1.80036 23.5041 2.84973 24.827 4.17261C26.1499 5.49549 27.1993 7.06598 27.9152 8.7944C28.6312 10.5228 28.9997 12.3753 28.9997 14.2462ZM26.1504 14.2462C26.1504 11.2235 24.9497 8.32467 22.8123 6.18732C20.6749 4.04998 17.7761 2.84924 14.7534 2.84924C11.7307 2.84924 8.83181 4.04998 6.69445 6.18732C4.5571 8.32467 3.35634 11.2235 3.35634 14.2462C3.35634 17.2688 4.5571 20.1677 6.69445 22.305C8.83181 24.4424 11.7307 25.6431 14.7534 25.6431C17.7761 25.6431 20.6749 24.4424 22.8123 22.305C24.9497 20.1677 26.1504 17.2688 26.1504 14.2462ZM9.90963 20.7994L16.4629 14.2462L9.90963 7.69294L11.9041 5.69847L20.4519 14.2462L11.9041 22.7939L9.90963 20.7994Z"
                fill={index >= maxIndex ? '#CECFDB' : '#00DB05'}
              />
            </svg>
          </button>
        )}
      </div>

      {shouldShowButtons && maxIndex > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-green-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
