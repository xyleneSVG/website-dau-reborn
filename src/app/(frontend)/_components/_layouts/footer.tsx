'use client'

import Image from 'next/image'
import React from 'react'
import { Footer, Media, Page } from '@/payload-types'

interface Props {
  data: Footer
}

export default function FooterComponent({ data }: Props) {
  return (
    <footer className="relative mt-10">
      <div className="w-full flex justify-between items-end z-10">
        <div className="relative aspect-[3/2] w-[80px] sm:w-[100px] md:w-[140px] lg:w-[160px] xl:w-[180px]">
          <Image
            src="/statis/shape1.png"
            alt="shape1"
            width={1920}
            height={200}
            layout="responsive"
            className="object-contain"
            priority
          />
        </div>
        <div className="relative w-[200px] sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] items-end">
          <Image
            src="/statis/shape2.png"
            alt="shape2"
            width={1920}
            height={50}
            layout="responsive"
            className="object-contain"
          />
        </div>
      </div>

      <div className="bg-black w-full p-6 sm:p-8 md:p-12 min-2xl:p-20 py-14 sm:py-16 md:py-18 lg:py-20 xl:md:py-24 2xl:py-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info Section - 1/3 pada MD+ */}
          <div className="flex flex-col md:col-span-1">
            {(data?.footerLogo as Media)?.url && (
              <Image
                src={(data.footerLogo as Media).url ?? ''}
                alt={data?.footerTitle || ''}
                width={0}
                height={0}
                className="w-[160px] sm:w-[180px] lg:w-[200px] h-auto object-contain"
              />
            )}
            <h1 className="text-white font-bold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] mt-4">
              {data.footerTitle}
            </h1>
            <p className="text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-justify">
              {data.footerDescription}
            </p>
          </div>

          {/* Navigation Groups - 2/3 pada MD+ */}
          {Array.isArray(data.footerNavigation) && data.footerNavigation.length > 0 && (
            <div className="md:col-span-2 flex flex-col space-y-8 sm:space-y-0 sm:flex-row sm:justify-between sm:space-x-8">
              {/* First Navigation Group */}
              <div
                className={`flex flex-col ${
                  // SM dan LG+: Logika flex berdasarkan jumlah data
                  data.footerNavigation[0]?.navigationGroupItem.length > 3 &&
                  data.footerNavigation[1]?.navigationGroupItem.length <= 3
                    ? 'sm:flex-[2] md:flex-1 lg:flex-[2]'
                    : data.footerNavigation[0]?.navigationGroupItem.length > 3 &&
                        data.footerNavigation[1]?.navigationGroupItem.length > 3
                      ? 'sm:flex-[1.3] md:flex-1 lg:flex-[1.3]'
                      : data.footerNavigation[0]?.navigationGroupItem.length <= 3 &&
                          data.footerNavigation[1]?.navigationGroupItem.length > 3
                        ? 'sm:flex-[0.7] md:flex-1 lg:flex-[0.7]'
                        : 'flex-1'
                }`}
              >
                <h1 className="text-white font-bold uppercase mb-4 text-[16px] lg:hidden">
                  {data.footerNavigation[0]?.navigationGroupTitle}
                </h1>

                {/* Mobile: Single column dengan jarak sama */}
                <div className="sm:hidden">
                  <div className="flex flex-col space-y-3 text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                    {data.footerNavigation[0]?.navigationGroupItem.map((navItem, i) => (
                      <a
                        key={i}
                        href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                        className="hover:underline hover:text-gray-300 transition"
                      >
                        {navItem.navigationPageName}
                      </a>
                    ))}
                  </div>
                </div>

                {/* SM: Split jika > 3 items */}
                <div className="hidden sm:block md:hidden">
                  {data.footerNavigation[0]?.navigationGroupItem.length > 3 ? (
                    <div className="grid grid-cols-2 gap-x-6 text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                      <div className="flex flex-col space-y-2">
                        {data.footerNavigation[0].navigationGroupItem
                          .slice(
                            0,
                            Math.ceil(data.footerNavigation[0].navigationGroupItem.length / 2),
                          )
                          .map((navItem, i) => (
                            <a
                              key={i}
                              href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                              className="hover:underline hover:text-gray-300 transition"
                            >
                              {navItem.navigationPageName}
                            </a>
                          ))}
                      </div>
                      <div className="flex flex-col space-y-2">
                        {data.footerNavigation[0].navigationGroupItem
                          .slice(Math.ceil(data.footerNavigation[0].navigationGroupItem.length / 2))
                          .map((navItem, i) => (
                            <a
                              key={
                                i +
                                Math.ceil(data.footerNavigation[0].navigationGroupItem.length / 2)
                              }
                              href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                              className="hover:underline hover:text-gray-300 transition"
                            >
                              {navItem.navigationPageName}
                            </a>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                      {data.footerNavigation[0]?.navigationGroupItem.map((navItem, i) => (
                        <a
                          key={i}
                          href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                          className="hover:underline hover:text-gray-300 transition"
                        >
                          {navItem.navigationPageName}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* MD: Tetap ke bawah meskipun > 3 items */}
                <div className="hidden md:block lg:hidden">
                  <div className="flex flex-col space-y-2 text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                    {data.footerNavigation[0]?.navigationGroupItem.map((navItem, i) => (
                      <a
                        key={i}
                        href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                        className="hover:underline hover:text-gray-300 transition"
                      >
                        {navItem.navigationPageName}
                      </a>
                    ))}
                  </div>
                </div>

                {/* LG+: Split jika > 3 items */}
                <div className="hidden lg:block">
                  <div className="flex justify-around items-start text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                    <div className="flex flex-col text-left">
                      <h1 className="text-white font-bold uppercase mb-4 text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px]">
                        {data.footerNavigation[0]?.navigationGroupTitle}
                      </h1>
                      {data.footerNavigation[0]?.navigationGroupItem.length > 3 ? (
                        <div className="flex gap-12 xl:gap-16">
                          <div className="flex flex-col space-y-2">
                            {data.footerNavigation[0].navigationGroupItem
                              .slice(
                                0,
                                Math.ceil(data.footerNavigation[0].navigationGroupItem.length / 2),
                              )
                              .map((navItem, i) => (
                                <a
                                  key={i}
                                  href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                                  className="hover:underline hover:text-gray-300 transition"
                                >
                                  {navItem.navigationPageName}
                                </a>
                              ))}
                          </div>
                          <div className="flex flex-col space-y-2">
                            {data.footerNavigation[0].navigationGroupItem
                              .slice(
                                Math.ceil(data.footerNavigation[0].navigationGroupItem.length / 2),
                              )
                              .map((navItem, i) => (
                                <a
                                  key={
                                    i +
                                    Math.ceil(
                                      data.footerNavigation[0].navigationGroupItem.length / 2,
                                    )
                                  }
                                  href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                                  className="hover:underline hover:text-gray-300 transition"
                                >
                                  {navItem.navigationPageName}
                                </a>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col space-y-2">
                          {data.footerNavigation[0]?.navigationGroupItem.map((navItem, i) => (
                            <a
                              key={i}
                              href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                              className="hover:underline hover:text-gray-300 transition"
                            >
                              {navItem.navigationPageName}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Navigation Group */}
              <div
                className={`flex flex-col ${
                  // SM dan LG+: Logika flex berdasarkan jumlah data
                  data.footerNavigation[1]?.navigationGroupItem.length > 6 &&
                  data.footerNavigation[0]?.navigationGroupItem.length <= 6
                    ? 'sm:flex-[2] md:flex-1 lg:flex-[2]'
                    : data.footerNavigation[1]?.navigationGroupItem.length > 6 &&
                        data.footerNavigation[0]?.navigationGroupItem.length > 6
                      ? 'sm:flex-[1.3] md:flex-1 lg:flex-[1.3]'
                      : data.footerNavigation[1]?.navigationGroupItem.length <= 6 &&
                          data.footerNavigation[0]?.navigationGroupItem.length > 6
                        ? 'sm:flex-[0.7] md:flex-1 lg:flex-[0.7]'
                        : 'flex-1'
                }`}
              >
                {data.footerNavigation[1] && (
                  <>
                    <h1 className="text-white font-bold uppercase mb-4 text-[16px] lg:hidden">
                      {data.footerNavigation[1].navigationGroupTitle}
                    </h1>

                    {/* Mobile: Single column dengan jarak sama */}
                    <div className="sm:hidden">
                      <div className="flex flex-col space-y-3 text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                        {data.footerNavigation[1].navigationGroupItem.map((navItem, i) => (
                          <a
                            key={i}
                            href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                            className="hover:underline hover:text-gray-300 transition"
                          >
                            {navItem.navigationPageName}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* SM: Split jika > 3 items */}
                    <div className="hidden sm:block md:hidden">
                      {data.footerNavigation[1].navigationGroupItem.length > 3 ? (
                        <div className="grid grid-cols-2 gap-x-6 text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                          <div className="flex flex-col space-y-2">
                            {data.footerNavigation[1].navigationGroupItem
                              .slice(
                                0,
                                Math.ceil(data.footerNavigation[1].navigationGroupItem.length / 2),
                              )
                              .map((navItem, i) => (
                                <a
                                  key={i}
                                  href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                                  className="hover:underline hover:text-gray-300 transition"
                                >
                                  {navItem.navigationPageName}
                                </a>
                              ))}
                          </div>
                          <div className="flex flex-col space-y-2">
                            {data.footerNavigation[1].navigationGroupItem
                              .slice(
                                Math.ceil(data.footerNavigation[1].navigationGroupItem.length / 2),
                              )
                              .map((navItem, i) => (
                                <a
                                  key={
                                    i +
                                    Math.ceil(
                                      data.footerNavigation[1].navigationGroupItem.length / 2,
                                    )
                                  }
                                  href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                                  className="hover:underline hover:text-gray-300 transition"
                                >
                                  {navItem.navigationPageName}
                                </a>
                              ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col space-y-2 text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                          {data.footerNavigation[1].navigationGroupItem.map((navItem, i) => (
                            <a
                              key={i}
                              href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                              className="hover:underline hover:text-gray-300 transition"
                            >
                              {navItem.navigationPageName}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* MD: Tetap ke bawah meskipun > 3 items */}
                    <div className="hidden md:block lg:hidden">
                      <div className="flex flex-col space-y-2 text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                        {data.footerNavigation[1].navigationGroupItem.map((navItem, i) => (
                          <a
                            key={i}
                            href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                            className="hover:underline hover:text-gray-300 transition w-fit"
                          >
                            {navItem.navigationPageName}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* LG+: Split jika > 3 items */}
                    <div className="hidden lg:block">
                      <div className="flex justify-around items-start text-white font-light text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                        <div className="flex flex-col text-left">
                          <h1 className="text-white font-bold uppercase mb-4 text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px]">
                            {data.footerNavigation[1]?.navigationGroupTitle}
                          </h1>
                          {data.footerNavigation[1]?.navigationGroupItem.length > 3 ? (
                            <div className="flex lg:gap-12 xl:gap-16">
                              <div className="flex flex-col space-y-2">
                                {data.footerNavigation[1].navigationGroupItem
                                  .slice(
                                    0,
                                    Math.ceil(
                                      data.footerNavigation[1].navigationGroupItem.length / 2,
                                    ),
                                  )
                                  .map((navItem, i) => (
                                    <a
                                      key={i}
                                      href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                                      className="hover:underline hover:text-gray-300 transition"
                                    >
                                      {navItem.navigationPageName}
                                    </a>
                                  ))}
                              </div>
                              <div className="flex flex-col space-y-2">
                                {data.footerNavigation[1].navigationGroupItem
                                  .slice(
                                    Math.ceil(
                                      data.footerNavigation[1].navigationGroupItem.length / 2,
                                    ),
                                  )
                                  .map((navItem, i) => (
                                    <a
                                      key={
                                        i +
                                        Math.ceil(
                                          data.footerNavigation[1].navigationGroupItem.length / 2,
                                        )
                                      }
                                      href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                                      className="hover:underline hover:text-gray-300 transition"
                                    >
                                      {navItem.navigationPageName}
                                    </a>
                                  ))}
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col space-y-2">
                              {data.footerNavigation[1]?.navigationGroupItem.map((navItem, i) => (
                                <a
                                  key={i}
                                  href={(navItem?.navigationPageReference as Page)?.pageKey ?? ''}
                                  className="hover:underline hover:text-gray-300 transition"
                                >
                                  {navItem.navigationPageName}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white py-3">
        <p className="text-center font-light text-black text-[12px] sm:text-[14px] lg:text-[16px]">
          Copyright &copy; PT. Data Andalan Utama All Rights Reserved
        </p>
      </div>
    </footer>
  )
}
