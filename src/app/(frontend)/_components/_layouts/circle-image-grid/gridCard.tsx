import Image, { StaticImageData } from 'next/image'
import React from 'react'

type GridCardProps = {
  title: string
  description: string
  photo: string | StaticImageData
}

export default function GridCard({ title, description, photo }: GridCardProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-[100px] sm:w-[120px] md:w-[200px] lg:w-[250px] xl:w-[300px] 2xl:w-[400px] aspect-square rounded-full overflow-hidden mx-auto">
        <Image src={photo} alt="leader-photo" fill priority className="object-contain" />
      </div>
      <div className="flex flex-col items-center mt-[20px] md:mt-[28px] lg:mt-[32px] xl:mt-[40px] 2xl:mt-[46px]">
        <h1 className="font-semibold text-[16px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px]">
          {title}
        </h1>
        <p className="font-light text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[24px]">
          {description}
        </p>
      </div>
    </div>
  )
}
