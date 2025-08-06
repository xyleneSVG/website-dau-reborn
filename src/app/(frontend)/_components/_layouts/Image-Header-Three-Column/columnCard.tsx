import React from 'react'

type ColumnCardProps = {
  title: string;
  description: string;
}

export default function ColumnCard({title, description}: ColumnCardProps) {
  return (
    <div className='w-full md:w-[47%] xl:w-[30%] bg-white p-[15px] rounded-[24px] 2xl:min-h-[680px] shadow-md'>
        <div className='h-full border-[2px] border-[#CECFDB] px-[24px] py-[32px] rounded-[16px]'>
            <h1 className='font-bold text-center text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] uppercase'>{title}</h1>
            <div className='w-full mx-auto h-[2px] bg-[#CECFDB] my-[24px]'></div>
            <p className='text-justify text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[24px]'>{description}</p>
        </div>
    </div>
  )
}
