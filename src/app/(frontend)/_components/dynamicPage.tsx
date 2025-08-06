/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { JSX, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import {
  Phone,
  ArrowRight,
  ChevronRight,
  Server,
  FileCode2,
  CodeXml,
  Puzzle,
  BadgeCheck,
  Shuffle,
  LockKeyhole,
  File,
  Users,
  FileSearch,
  Database,
  ShieldCheck,
  Rocket,
  Waypoints,
  ChartPie,
  UserCog,
  FilePenLine,
  MonitorCog,
  AppWindow,
  EarthLock,
  Cloudy,
  UserStar,
  Smartphone,
  PencilRuler,
  LucideIcon,
} from 'lucide-react'

// components
import NotFound from './NotFound'
import NavbarComponent from './_layouts/navbar'
import FooterComponent from './_layouts/footer'
import Hero from './_layouts/hero'
import ZigZagList from './_layouts/zigZagList'
import ImageWithCarousel from './_layouts/imageWithCarousel'
import QuadGrid from './_layouts/quadGrid'
import ImageGridCarousel from './_layouts/imageGridCarousel'
import Contact from './_layouts/contact'
import LayeredTextOnImage from './_layouts/layeredTextOnImage'
import IllustrationWithTextAndCarousel from './_layouts/illustrationWithTextAndCarousel'
import ImageHeaderParagraph from './_layouts/imageHeaderParagraph'
import ImageHeaderThreeCard from './_layouts/Image-Header-Three-Column/imageHeaderThreeColumn'
import CircleImageGrid from './_layouts/circle-image-grid/circleImageGrid'
import TextWithImageCluster from './_layouts/textWithImageCluster'
import LoopingCarousel from './_layouts/loopingCarousel'
import ListWithIcon from './_layouts/list-with-icon/listWithIcon'
import TextAlignCenter from './_layouts/textAlignCenter'
import ListWithIconAndDescription from './_layouts/list-with-icon-and-description/listWithIconAndDescription'
import TwoListWithIllustration from './_layouts/twoListWithIllustration'
import TextGrid from './_layouts/textGrid'
import IconListWithSideImages from './_layouts/iconListWithSideImages'
import CardWithImageSection from './_layouts/card-with-image/cardWithImageSection'
import IconTextListWithImage from './_layouts/iconTextListWithImage'
import ThreeDimensionCarousel from './_layouts/threeDimensionCarousel'
import GridImage from './_layouts/grid-image/gridImage'

// interfaces
import type { Page } from '@/payload-types'
import type { Navbar } from '@/payload-types'
import type { Footer } from '@/payload-types'

interface DynamicPageProps {
  slug: string
}

import { getDataPages } from '../_functions/getDataPages'
import { getDataNavbar } from '../_functions/getDataNavbar'
import { getDataFooter } from '../_functions/getDataFooter'

const iconMap: Record<string, LucideIcon> = {
  phone: Phone,
  arrowright: ArrowRight,
  chevronright: ChevronRight,
  server: Server,
  filecode2: FileCode2,
  codexml: CodeXml,
  puzzle: Puzzle,
  badgecheck: BadgeCheck,
  shuffle: Shuffle,
  lockkeyhole: LockKeyhole,
  file: File,
  users: Users,
  filesearch: FileSearch,
  database: Database,
  shieldcheck: ShieldCheck,
  rocket: Rocket,
  waypoints: Waypoints,
  chartpie: ChartPie,
  usercog: UserCog,
  filepenline: FilePenLine,
  monitorcog: MonitorCog,
  appwindow: AppWindow,
  earthlock: EarthLock,
  cloudy: Cloudy,
  userstar: UserStar,
  smartphone: Smartphone,
  pencilruler: PencilRuler,
}

function getLucideIcon(name?: string): LucideIcon | null {
  if (!name) return null
  return iconMap[name.toLowerCase()] || null
}

const sectionComponentMap: Record<
  string,
  (props: { data: any; getLucideIcon: (name?: string) => LucideIcon | null }) => JSX.Element
> = {
  heroSection: ({ data }) => <Hero data={data} />,
  zigZagListSection: ({ data }) => <ZigZagList data={data} />,
  imageWithCarouselSection: ({ data }) => <ImageWithCarousel data={data} />,
  quadGridSection: ({ data }) => <QuadGrid data={data} />,
  imageGridCarouselSection: ({ data }) => <ImageGridCarousel data={data} />,
  contactSection: ({ data }) => <Contact data={data} />,
  layeredTextOnImageSection: ({ data }) => <LayeredTextOnImage data={data} />,
  illustrationWithTextAndCarouselSection: ({ data }) => (
    <IllustrationWithTextAndCarousel data={data} />
  ),
  imageHeaderParagraphSection: ({ data }) => <ImageHeaderParagraph data={data} />,
  imageHeaderThreeColumnSection: ({ data }) => <ImageHeaderThreeCard data={data} />,
  circleImageGridSection: ({ data }) => <CircleImageGrid data={data} />,
  textWithImageClusterSection: ({ data, getLucideIcon }) => (
    <TextWithImageCluster data={data} getLucideIcon={getLucideIcon} />
  ),
  loopingCarouselSection: ({ data }) => <LoopingCarousel data={data} />,
  listWithIconSection: ({ data, getLucideIcon }) => (
    <ListWithIcon data={data} getLucideIcon={getLucideIcon} />
  ),
  textAlignCenterSection: ({ data }) => <TextAlignCenter data={data} />,
  listWithIconDescriptionSection: ({ data, getLucideIcon }) => (
    <ListWithIconAndDescription data={data} getLucideIcon={getLucideIcon} />
  ),
  twoListWithIllustrationSection: ({ data, getLucideIcon }) => (
    <TwoListWithIllustration data={data} getLucideIcon={getLucideIcon} />
  ),
  textGridSection: ({ data }) => <TextGrid data={data} />,
  iconListWithSideImagesSection: ({ data }) => <IconListWithSideImages data={data} />,
  cardWithImageSection: ({ data }) => <CardWithImageSection data={data} />,
  iconTextListWithImageSection: ({ data, getLucideIcon }) => (
    <IconTextListWithImage data={data} getLucideIcon={getLucideIcon} />
  ),
  threeDimensionCarouselSection: ({ data }) => <ThreeDimensionCarousel data={data} />,
  gridImageSection: ({ data }) => <GridImage data={data} />,
}

export default function DynamicPage({ slug }: DynamicPageProps) {
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [fetchedPage, setFetchedPage] = useState<Page | null>(null)
  const [fetchedNavbar, setFetchedNavbar] = useState<Navbar | null>(null)
  const [fetchedFooter, setFetchedFooter] = useState<Footer | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataPages(slug)
        const navbarData = await getDataNavbar(slug)
        const footerData = await getDataFooter(slug)

        if (!result || result.length === 0) {
          setNotFound(true)
          return
        }

        setFetchedPage(result[0] as Page)
        setFetchedNavbar(navbarData as Navbar)
        setFetchedFooter(footerData as Footer)
      } catch (err) {
        console.error(err)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const { data: livePreviewData } = useLivePreview<Page>({
    initialData: fetchedPage ?? ({} as Page),
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
    depth: 2,
  })

  const { data: livePreviewNavbar } = useLivePreview<Navbar>({
    initialData: fetchedNavbar ?? ({} as Navbar),
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
    depth: 2,
  })

  const { data: livePreviewFooter } = useLivePreview<Footer>({
    initialData: fetchedFooter ?? ({} as Footer),
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
    depth: 2,
  })

  const pageData = { ...fetchedPage, ...livePreviewData }
  const navbarData = { ...fetchedNavbar, ...livePreviewNavbar }
  const footerData = { ...fetchedFooter, ...livePreviewFooter }

  const renderSection = (section: any, index: number) => {
    const Component = sectionComponentMap[section.blockType]
    if (!Component) return <NotFound key={index} />
    return <Component key={index} data={section} getLucideIcon={getLucideIcon} />
  }

  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center min-h-screen bg-white"
        >
          <div className="w-16 h-16 border-4 border-[#00DB05] border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (notFound || !pageData) return <NotFound />

  return (
    <div>
      {fetchedNavbar && (
        <NavbarComponent data={navbarData} getLucideIcon={getLucideIcon} page={pageData} />
      )}
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        scriptProps={{ async: true, defer: true, appendTo: 'head', nonce: undefined }}
      >
        {pageData.pageSection?.map((section, index) => renderSection(section, index))}
      </GoogleReCaptchaProvider>
      {fetchedFooter && <FooterComponent data={footerData} />}
    </div>
  )
}
