'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'

type ListCardProps = {
  icon: string
  title: string
  description: string
  backgroundIconColor: string
  iconColor: string
  getLucideIcon: (name?: string) => LucideIcon | null
}

export default function ListCard({
  icon,
  title,
  description,
  getLucideIcon,
  backgroundIconColor,
  iconColor,
}: ListCardProps) {
  const IconComponent = getLucideIcon?.(icon)
  return (
    <div className="bg-white rounded-xl shadow-md p-6 xl:p-8 flex flex-col items-center text-center hover:shadow-lg transition">
      <div
        className="flex items-center justify-center rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-4"
        style={{ backgroundColor: backgroundIconColor }}
      >
        {IconComponent && (
          <IconComponent
            className="size-6 sm:size-7 md:size-8 lg:size-12"
            strokeWidth={1.5}
            style={{ color: iconColor }}
          />
        )}
      </div>
      <h3 className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[24px] font-semibold mb-2 md:mb-3">
        {title}
      </h3>
      <p className="text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[24px] font-light text-justify">
        {description}
      </p>
    </div>
  )
}
