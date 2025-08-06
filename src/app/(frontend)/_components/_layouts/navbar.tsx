'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Menu, Triangle, Phone, LucideIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

import type { Page, Navbar, Media } from '@/payload-types'

interface Props {
  data: Navbar
  getLucideIcon: (name?: string) => LucideIcon | null
  page: Page
}

export default function NavbarComponent({ data, getLucideIcon, page }: Props) {
  const [isOpenNavbar, setIsOpenNavbar] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [language, setLanguage] = useState<'en' | 'id'>('id')
  const [isLangOpen, setIsLangOpen] = useState(false)

  const searchParams = useSearchParams()
  const localeParam = searchParams?.get('locale')

  useEffect(() => {
    if (localeParam === 'id' || localeParam === 'en') {
      setLanguage(localeParam)
    } else {
      setLanguage('id')
    }
  }, [localeParam])

  const handleLanguageChange = (lang: 'id' | 'en') => {
    setLanguage(lang)
    setIsLangOpen(false)

    const current = new URLSearchParams(Array.from(searchParams?.entries() || []))
    current.set('locale', lang)

    const query = current.toString()
    window.location.search = `?${query}`
  }

  const toggleNavbar = () => setIsOpenNavbar(!isOpenNavbar)

  const handleDropdown = (dropdown: string) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown))
  }

  const languageMap: Record<'en' | 'id', string> = {
    en: 'English',
    id: 'Bahasa Indonesia',
  }

  const getLanguageLabel = () => languageMap[language]

  const dropdownAnimationClass = (isOpen: boolean) =>
    `transition-all duration-300 ease-in-out origin-top transform ${
      isOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'
    }`

  return (
    <div
      className="w-full h-max flex flex-col p-6 md:px-12 min-2xl:px-20 sticky top-0 z-50"
      style={{ background: 'linear-gradient(0deg, #D9D9D9 -20.5%, #FFFFFF 39.75%)' }}
    >
      {/* Mobile Toggle */}
      <div className="flex flex-row justify-between items-center md:hidden">
        {(data?.navbarLogo as Media)?.url && (
          <Image
            src={(data.navbarLogo as Media).url ?? ''}
            alt=""
            width={0}
            height={0}
            className="w-24 lg:w-28 h-auto"
          />
        )}
        <div>
          {isOpenNavbar ? (
            <X
              size={30}
              onClick={toggleNavbar}
              className="cursor-pointer transition-all duration-300"
            />
          ) : (
            <Menu
              size={30}
              onClick={toggleNavbar}
              className="cursor-pointer transition-all duration-300"
            />
          )}
        </div>
      </div>

      {/* Navbar Content */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden md:overflow-visible ${
          isOpenNavbar ? 'max-h-[1000px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        } md:max-h-full md:opacity-100 md:visible md:block`}
      >
        <div className="md:w-full">
          <div className="flex flex-col gap-8 md:flex-row xl:gap-0 md:justify-between md:items-center 2xl:text-[24px]">
            {(data?.navbarLogo as Media)?.url && (
              <Image
                src={(data.navbarLogo as Media).url ?? ''}
                alt=""
                width={0}
                height={0}
                className="w-[100px] lg:w-[135px] h-auto hidden lg:block"
              />
            )}
            {/* Navigation Items */}
            <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8 xl:gap-10 2xl:gap-12 text-[14px] sm:text-[16px] xl:text-[18px] 2xl:text-[20px] mt-4 md:mt-0">
              {Array.isArray(data?.navbarItemArray) &&
                data?.navbarItemArray.map((item) => {
                  const itemPath = (item?.navbarItemReference as Page)?.pageKey || '/'
                  const isActive = page?.pageKey === itemPath
                  const isDropdown = item?.hasDropdown

                  return (
                    <li key={item.id} className="relative">
                      {isDropdown ? (
                        <>
                          <button
                            onClick={() => handleDropdown(item.navbarItemName.toLowerCase() as any)}
                            className="flex items-center gap-2"
                          >
                            <p>{item.navbarItemName}</p>
                            <Triangle
                              className={`size-2 md:size-3 fill-current text-black stroke-none transition-transform duration-300 ${
                                openDropdown === item.navbarItemName.toLowerCase()
                                  ? 'rotate-0'
                                  : 'rotate-180'
                              }`}
                            />
                          </button>

                          <div
                            className={`absolute left-0 top-full mt-2 w-full md:w-max bg-white rounded-xl shadow-xl z-50 ${dropdownAnimationClass(
                              openDropdown === item.navbarItemName.toLowerCase(),
                            )}`}
                          >
                            <div
                              className="w-full h-1.5"
                              style={{ background: data?.accentColor ?? '' }}
                            />
                            <ul className="p-4 space-y-2 lg:space-y-3">
                              {item?.navbarDropdown?.map((dropdown) => {
                                const IconComponent = getLucideIcon?.(dropdown.itemDropdownIcon)

                                return (
                                  <li key={dropdown.id} className="relative group">
                                    <a
                                      href={
                                        (dropdown?.itemDropdownReference as Page)?.pageKey || '/'
                                      }
                                      className="flex items-center justify-between w-full text-left gap-4"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="bg-gray-200 rounded-md flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-1 sm:p-1.5 md:p-2 lg:p-2.5">
                                          {IconComponent && (
                                            <IconComponent
                                              className="size-6 sm:size-7 md:size-8 lg:size-12"
                                              strokeWidth={1.5}
                                            />
                                          )}
                                        </div>
                                        <p
                                          onMouseEnter={() =>
                                            setHoveredDropdown(dropdown?.id ?? '')
                                          }
                                          onMouseLeave={() => setHoveredDropdown(null)}
                                          style={{
                                            color:
                                              hoveredDropdown === dropdown?.id
                                                ? (data?.accentColor ?? '#000000')
                                                : '#000000',
                                            transition: 'color 0.2s ease-in-out',
                                          }}
                                        >
                                          {dropdown.itemDropdownTitle}
                                        </p>
                                      </div>
                                      <Triangle className="rotate-90 size-2 md:size-3 ml-2 fill-current text-black stroke-none" />
                                    </a>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <a
                          href={(item?.navbarItemReference as Page)?.pageKey || '/'}
                          style={{
                            color: isActive ? (data?.accentColor ?? '#000000') : '#000000',
                            fontWeight: isActive ? '600' : '400',
                          }}
                        >
                          {item.navbarItemName}
                        </a>
                      )}
                    </li>
                  )
                })}
            </ul>

            {/* Contact & Language Selector */}
            <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5 2xl:gap-10">
              {data.hasButtonContact && (
                <li>
                  <a
                    href={(data?.buttonContactReference as Page)?.pageKey || ''}
                    className="text-white text-[12px] sm:text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px] flex items-center w-max gap-x-2.5 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-md sm:rounded-lg md:rounded-xl md:px-5"
                    style={{ backgroundColor: data?.buttonContactColor ?? '' }}
                  >
                    {localeParam === 'en' ? 'Contact Us' : 'Hubungi Kami'}
                    <Phone className="size-3 md:size-4 fill-current stroke-none" />
                  </a>
                </li>
              )}
              <li className="relative">
                <button
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-[14px] md:text-[16px] lg:text-[18px] xl:text-[18px] 2xl:text-[24px]"
                >
                  {getLanguageLabel()}
                  <Triangle
                    className={`size-2 md:size-3 fill-current text-black stroke-none transition-transform duration-300 ${
                      isLangOpen ? 'rotate-0' : 'rotate-180'
                    }`}
                  />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50 ${dropdownAnimationClass(
                    isLangOpen,
                  )}`}
                >
                  <ul className="py-2 px-3 space-y-2 text-sm md:text-base">
                    <li
                      onClick={() => handleLanguageChange('id')}
                      className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
                    >
                      Bahasa Indonesia
                    </li>
                    <li
                      onClick={() => handleLanguageChange('en')}
                      className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
                    >
                      English
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
