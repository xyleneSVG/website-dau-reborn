import React from 'react'
import { LucideIcon } from 'lucide-react'

type ListCardProps = {
  icon: string
  title: string
  backgroundIconColor: string
  iconColor: string
  getLucideIcon: (name?: string) => LucideIcon | null
}

export default function ListCard({
  icon,
  title,
  backgroundIconColor,
  iconColor,
  getLucideIcon,
}: ListCardProps) {
  const IconComponent = getLucideIcon?.(icon)
  return (
    <div className="flex flex-col items-center text-center gap-y-1 sm:gap-y-2 md:gap-y-3 lg:gap-y-4">
      <div
        style={{ backgroundColor: backgroundIconColor }}
        className="flex items-center justify-center rounded-full w-12 sm:w-14 md:w-16 lg:w-20 aspect-square"
      >
        {IconComponent && (
          <IconComponent
            className="size-6 sm:size-7 md:size-8 lg:size-12"
            strokeWidth={1.5}
            style={{ color: iconColor }}
          />
        )}
      </div>
      <p className="text-xs sm:text-sm md:text-base font-medium">{title}</p>
    </div>
  )
}
