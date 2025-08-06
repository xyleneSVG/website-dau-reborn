'use client'

// modules
import Image from 'next/image'

// icons
import { ArrowRight } from 'lucide-react'

// images
import backgroundIcon1 from 'public/statis/service/backgroundIcon1.svg'
import backgroundIcon2 from 'public/statis/service/backgroundIcon2.svg'
import backgroundIcon3 from 'public/statis/service/backgroundIcon3.svg'

// interfaces
import { Media, Page, ZigZagListsSection } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
export type ContentList = ZigZagListsSection['contentLists'][number]

interface ZigZagListProps {
  data: ZigZagListsSection
}

export default function ZigZagList({ data }: ZigZagListProps) {
  const searchParams = useSearchParams()
  const localeParam = searchParams?.get('locale')
  return (
    <div className="w-full flex justify-center items-center relative p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30">
      <Image
        priority
        width={0}
        height={0}
        src={backgroundIcon1}
        alt=""
        className="absolute top-0 left-0 w-[240px] h-auto -z-10 md:w-[420px] 2xl:w-[620px]"
      />
      <Image
        priority
        width={0}
        height={0}
        src={backgroundIcon2}
        alt=""
        className="absolute top-[35%] right-0 w-[240px] h-auto -z-10 md:w-[420px] 2xl:w-[620px]"
      />
      <Image
        priority
        width={0}
        height={0}
        src={backgroundIcon3}
        alt=""
        className="absolute bottom-0 left-0 w-[240px] h-auto -z-10 md:w-[420px] 2xl:w-[620px]"
      />
      <div className="w-full flex flex-col items-center gap-y-14 md:pt-15 lg:gap-y-18 xl:gap-y-20 2xl:gap-y-24">
        <div className="flex flex-col items-center gap-y-1">
          <h1 className="uppercase font-light text-[18px] sm:text-[20px] md:text-[28px] lg:text-[32px] xl:text-[48px] 2xl:text-[64px] text-center">
            {data.sectionTitle}
          </h1>
          <p className="font-bold text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] 2xl:text-[36px] text-center">
            {data.sectionSubtitle}
          </p>
        </div>
        {Array.isArray(data.contentLists) &&
          data.contentLists.map((item: ContentList, index: number) => (
            <div
              key={item.id}
              className={`flex flex-col gap-y-6 items-center max-md:max-w-[440px] ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} md:justify-start md:items-center lg:w-[1000px] md:gap-x-6 2xl:gap-x-12 2xl:w-[1200px]`}
            >
              {(item.contentListIcon as Media)?.url && (
                <Image
                  src={(item.contentListIcon as Media).url ?? ''}
                  width={0}
                  height={0}
                  alt=""
                  className="w-40 h-auto md:w-70 2xl:w-[430px]"
                />
              )}
              <div
                className={`flex flex-col gap-y-4 text-[14px] ${index % 2 === 1 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}
              >
                <p className="uppercase text-[#00DB05] font-bold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]">
                  {item.contentListTitle}
                </p>
                <p className="font-light md:max-w-[480px] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] 2xl:max-w-[700px]">
                  {item.contentListDescription}
                </p>
                <a
                  href={(item?.contentReferencePage as Page)?.pageKey ?? ''}
                  className="border bg-white border-[#00DB05] flex flex-row gap-x-1 text-[#00DB05] w-max items-center rounded-[10px] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] py-1 px-2 md:py-2 md:px-3 2xl:text-[20px] 2xl:py-3 2xl:px-4"
                >
                  {localeParam === 'en' ? 'More information' : 'Selengkapnya'}{' '}
                  <ArrowRight className="size-[14px] md:size-[16px] lg:size-[18px] xl:size-[20px] 2xl:size-[24px]" />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
