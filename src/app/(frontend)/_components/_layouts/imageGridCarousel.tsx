'use client'

// modules
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

// images
import background from 'public/statis/imageGridCarousel/background1.svg'

// interfaces
import { ImageGridCarouselSection, Media } from '@/payload-types'

interface Props {
  data: ImageGridCarouselSection
}

export default function ImageGridCarousel({ data }: Props) {
  const [visibleCount, setVisibleCount] = useState(4)
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const isValidGridList = Array.isArray(data.gridLists) && data.gridLists.length > 0

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth
      if (width >= 768) setVisibleCount(10)
      else if (width >= 640) setVisibleCount(6)
      else setVisibleCount(4)
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  if (!data.sectionTitle && !isValidGridList) return null

  const handlePrev = () => {
    setDirection('prev')
    setStartIndex((prev) => (prev - visibleCount + data.gridLists?.length) % data.gridLists?.length)
  }

  const handleNext = () => {
    setDirection('next')
    setStartIndex((prev) => (prev + visibleCount) % data.gridLists?.length)
  }

  const getVisibleClient = () => {
    const items = []
    const actualCount = Math.min(visibleCount, data.gridLists?.length)
    for (let i = 0; i < actualCount; i++) {
      const index = (startIndex + i) % data.gridLists?.length
      const tech = data.gridLists[index]
      items.push({ ...tech, key: i })
    }
    return items
  }

  const visibleClient = getVisibleClient()
  const half = Math.ceil(visibleClient.length / 2)
  const firstRow = visibleClient.slice(0, half)
  const secondRow = visibleClient.slice(half)

  const slideVariants = {
    enter: ({ direction }: { direction: 'next' | 'prev' }) => ({
      x: direction === 'next' ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: ({ direction }: { direction: 'next' | 'prev' }) => ({
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
    }),
  }

  return (
    <div className="w-full relative p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30">
      <Image
        className="absolute z-0 w-[205px] h-auto top-0 right-0 md:w-[340px] md:-top-[10%] xl:w-[450px] xl:-top-[50%]"
        src={background}
        alt=""
        width={0}
        height={0}
      />

      <div className="w-full relative z-10 flex flex-col items-center gap-y-6 md:pt-10 sm:gap-y-8 md:gap-y-10 lg:gap-y-12 xl:gap-y-14 2xl:gap-y-18">
        {data.sectionTitle && (
          <h1 className="font-light uppercase text-[18px] sm:text-[20px] md:text-[28px] lg:text-[32px] xl:text-[48px] 2xl:text-[64px]">
            {data.sectionTitle}
          </h1>
        )}
        {isValidGridList && (
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-8">
            {data.gridLists.length > visibleCount && (
              <button
                onClick={handlePrev}
                className="w-6 h-6 rounded-full bg-[#00DB05] flex items-center justify-center lg:w-10 lg:h-10 2xl:w-14 2xl:h-14"
              >
                <ChevronLeft className="text-white w-4 h-4 lg:w-8 lg:h-8" />
              </button>
            )}

            <div className="flex flex-col gap-4 sm:gap-8 md:gap-8 xl:gap-10 2xl:gap-12">
              <AnimatePresence mode="wait" custom={{ direction }}>
                <motion.div
                  key={startIndex}
                  className="flex flex-col gap-4 sm:gap-8 md:gap-8 xl:gap-10 2xl:gap-12"
                  custom={{ direction }}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8 md:gap-8 xl:gap-10 2xl:gap-12 justify-center">
                    {firstRow.map((item) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex items-center bg-white justify-center rounded-[10px] shadow-lg w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px] 2xl:w-[180px] 2xl:h-[180px]"
                      >
                        {(item?.itemImage as Media)?.url && (
                          <Image
                            src={(item.itemImage as Media).url ?? ''}
                            alt={`client-${item.key}`}
                            width={70}
                            height={70}
                            className="w-[40px] h-auto sm:w-[55px] lg:w-[70px] xl:w-[90px] 2xl:w-[120px]"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8 md:gap-8 xl:gap-10 2xl:gap-12 justify-center">
                    {secondRow.map((item) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="flex items-center bg-white justify-center rounded-[10px] shadow-lg w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px] 2xl:w-[180px] 2xl:h-[180px]"
                      >
                        {(item?.itemImage as Media)?.url && (
                          <Image
                            src={(item.itemImage as Media).url ?? ''}
                            alt={`client-${item.key}`}
                            width={70}
                            height={70}
                            className="w-[40px] h-auto sm:w-[55px] lg:w-[70px] xl:w-[90px] 2xl:w-[120px]"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {data.gridLists.length > visibleCount && (
              <button
                onClick={handleNext}
                className="w-6 h-6 rounded-full bg-[#00DB05] flex items-center justify-center lg:w-10 lg:h-10 2xl:w-14 2xl:h-14"
              >
                <ChevronRight className="text-white w-4 h-4 lg:w-8 lg:h-8" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
