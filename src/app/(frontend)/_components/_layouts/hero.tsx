'use client'

// modules
import { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'

// images
import background from '/public/statis/hero/backgroundHero.svg'

// icons
import { Circle } from 'lucide-react'

// interface
import { HeroSection, Media } from '@/payload-types'

export default function Hero({ data, storage }: { data: HeroSection; storage: string }) {
  const illustrationLeftFilename = (data?.greetingIllustrationLeft as Media)?.filename
  console.log('p:', illustrationLeftFilename ? storage + illustrationLeftFilename : 'no filename')

  const greetings = Array.isArray(data?.greetings)
    ? data.greetings.map((item) => {
        const img = item.imageGreeting as Media
        return {
          type: item.hasIncludeImage ? 'image-text' : 'text',
          image: item.hasIncludeImage && img?.filename ? storage + img.filename : null,
          text: item.textGreeting,
        }
      })
    : []

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [greetings.length])

  useEffect(() => {
    setCurrentIndex(0)
  }, [data.greetings])

  const illustrationLeft = data.greetingIllustrationLeft as Media
  const illustrationRight = data.greetingIllustrationRight as Media

  return (
    <div className="w-full min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-92px)] lg:min-h-[calc(100vh-108px)] flex justify-center items-center relative p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30">
      <div className="w-full">
        <Image
          width={0}
          height={0}
          priority
          src={background}
          alt=""
          className="w-[420px] md:w-[622px] h-auto absolute top-0 left-0 2xl:w-[1056px]"
        />
        <div className="flex flex-col w-full items-center gap-y-1 mb-4 md:flex-row md:justify-between md:items-end md:gap-x-6 xl:gap-10">
          <div className="hidden lg:block lg:w-[25%] aspect-square relative">
            {illustrationLeft?.filename && (
              <Image
                src={storage + illustrationLeft.filename}
                alt="Illustration Left"
                fill
                className="object-contain"
              />
            )}
          </div>

          <div className="relative z-10 font-semibold text-center md:-translate-y-18 w-full lg:w-[37%] text-[18px] md:text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[48px] h-auto mb-10 sm:mb-12 md:mb-14 lg:mb-0 flex flex-col items-center justify-center 2xl:-translate-y-38">
            {greetings[currentIndex]?.type === 'image-text' && greetings[currentIndex].image ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={greetings[currentIndex].image}
                  width={500}
                  height={300}
                  alt="Greeting Image"
                  className="w-[250px] h-auto 2xl:w-[500px]"
                />
                <p>{greetings[currentIndex]?.text}</p>
              </div>
            ) : (
              <p>{greetings[currentIndex]?.text}</p>
            )}
          </div>

          <div className="w-[80%] lg:w-[37%] aspect-square relative">
            {illustrationRight?.filename && (
              <Image
                src={storage + illustrationRight.filename}
                alt="Illustration Right"
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>

        <div className="flex flex-row gap-x-2 justify-center mt-6 lg:mt-10">
          {greetings.map((_, index) => (
            <Circle
              key={index}
              className={`size-3 stroke-none ${
                index === currentIndex ? 'text-[#00DB05]' : 'text-[#D9D9D9]'
              } fill-current`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
