// modules
import Image from 'next/image'

// images
import background from 'public/statis/quadGrid/background1.svg'

// interfaces
import { QuadGridSection, Media } from '@/payload-types'

interface QuadGridProps {
  data: QuadGridSection
}

export default function QuadGrid({ data }: QuadGridProps) {
  return (
    <div className="w-full relative p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30">
      <Image
        priority
        className="h-auto w-[160px] absolute bottom-0 left-0 z-0 sm:w-[340px] md:w-[430px]"
        src={background}
        alt={''}
        width={0}
        height={0}
      />
      <div className="w-full 2xl:gap-y-24 z-10 relative">
        <div className="flex flex-col items-center justify-center gap-y-8 sm:gap-y-12 md:gap-y-16">
          <div className="text-center space-y-3">
            <h1 className="uppercase font-light text-[18px] sm:text-[20px] md:text-[28px] lg:text-[32px] xl:text-[48px] 2xl:text-[64px]">
              {data.sectionTitle}
            </h1>
            <p className="font-normal text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
              {data.sectionSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 justify-items-center gap-4 sm:gap-6 md:gap-8 xl:gap-10 2xl:gap-12">
            {Array.isArray(data.gridLists) &&
              data.gridLists.map((src, idx) => (
                <div
                  key={idx}
                  className="rounded-[10px] shadow-md md:shadow-lg md:rounded-[20px] bg-center bg-cover overflow-hidden w-[130px] h-[90px] sm:w-[260px] sm:h-[160px] md:w-[280px] md:h-[200px] lg:w-[340px] lg:h-[240px] xl:w-[440px] xl:h-[300px]"
                  style={{ backgroundImage: `url('${(src.itemImage as Media)?.url}')` }}
                ></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
