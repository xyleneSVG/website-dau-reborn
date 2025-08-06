// modules
import { APIError, CollectionConfig } from 'payload'
import { client, connectRedis } from '@/app/lib/redis'

// block
import { HeroSection } from './block-layouts/HeroSection'
import { ZigZagListSection } from './block-layouts/ZigZagListsSection'
import { ImageWithCarouselSection } from './block-layouts/ImageWithCarouselSection'
import { QuadGridSection } from './block-layouts/QuadGridSection'
import { ImageGridCarouselSection } from './block-layouts/ImageGridCarouselSection'
import { ContactSection } from './block-layouts/ContactSection'
import { LayeredTextOnImageSection } from './block-layouts/LayeredTextOnImageSection'
import { IllustrationWithTextAndCarouselSection } from './block-layouts/IllustrationWithTextAndCarouselSection'
import { ImageHeaderParagraphSection } from './block-layouts/ImageHeaderParagraphSection'
import { ImageHeaderThreeColumnSection } from './block-layouts/ImageHeaderThreeColumnSection'
import { CircleImageGridSection } from './block-layouts/CircleImageGridSection'
import { TextWithImageClusterSection } from './block-layouts/TextWithImageClusterSection'
import { LoopingCarouselSection } from './block-layouts/LoopingCarouselSection'
import { ListWithIconSection } from './block-layouts/ListWithIconSection'
import { TextAlignCenterSection } from './block-layouts/TextAlignCenterSection'
import { ListWithIconDescriptionSection } from './block-layouts/ListWithIconDescriptionSection'
import { TwoListWithIllustrationSection } from './block-layouts/TwoListWithIllustrationSection'
import { TextGridSection } from './block-layouts/TextGridSection'
import { IconListWithSideImagesSection } from './block-layouts/IconListWithSideImagesSection'
import { CardWithImageSection } from './block-layouts/CardWithImageSection'
import { IconTextListWithImageSection } from './block-layouts/IconTextListWithImageSection'
import { ThreeDimensionCarouselSection } from './block-layouts/ThreeDimensionCarousel'
import { GridImageSection } from './block-layouts/GridImage'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'pageKey',
    group: 'Advance Configuration',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'INSTRUCTION',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'howToUse',
          type: 'ui',
          admin: {
            components: {
              Field: '@/admin/_components/instruction',
            },
          },
        },
      ],
    },
    {
      name: 'pageName',
      type: 'text',
      label: 'Page Name',
      required: true,
      unique: true,
    },
    {
      name: 'pageDefault',
      type: 'checkbox',
      label: 'Page Default?',
      admin: {
        description:
          'Enable if this page will be located at "https:{domain}/" (make sure there is no other page as the default page)',
        condition: (_, siblingData) => !siblingData?.pageGroup,
      },
      defaultValue: false,
    },
    {
      name: 'pageKey',
      type: 'text',
      label: 'Page Key',
      admin: {
        readOnly: true,
      },
      defaultValue: 'Save first to get the key of this page',
    },
    {
      name: 'pageGroup',
      type: 'relationship',
      relationTo: 'groupPage',
      label: 'Page Group',
      admin: {
        description: 'Example: https://{domain}/{Group}/{This Page}',
        condition: (_, siblingData) => siblingData?.pageDefault === false,
      },
    },
    {
      name: 'pageSection',
      type: 'blocks',
      blocks: [
        HeroSection,
        ZigZagListSection,
        ImageWithCarouselSection,
        QuadGridSection,
        ImageGridCarouselSection,
        ContactSection,
        LayeredTextOnImageSection,
        IllustrationWithTextAndCarouselSection,
        ImageHeaderParagraphSection,
        ImageHeaderThreeColumnSection,
        CircleImageGridSection,
        TextWithImageClusterSection,
        LoopingCarouselSection,
        ListWithIconSection,
        TextAlignCenterSection,
        ListWithIconDescriptionSection,
        TwoListWithIllustrationSection,
        TextGridSection,
        IconListWithSideImagesSection,
        CardWithImageSection,
        IconTextListWithImageSection,
        ThreeDimensionCarouselSection,
        GridImageSection,
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req, originalDoc }) => {
        console.log(data)
        if (data?.pageDefault) {
          const existingDefaultPages = await req.payload.find({
            collection: 'pages',
            where: {
              pageDefault: {
                equals: true,
              },
            },
            depth: 0,
          })
          const alreadyExists = existingDefaultPages.docs.find((doc) => doc.id !== originalDoc?.id)
          if (alreadyExists) {
            throw new APIError(
              `Page "${alreadyExists.pageName}" is already set as default. Only one default page is allowed.`,
              400,
              undefined,
              true,
            )
          }
        }
        if (data?.pageName) {
          const existingPageName = await req.payload.find({
            collection: 'pages',
            where: {
              pageName: {
                equals: data?.pageName,
              },
            },
            depth: 0,
          })
          const alreadyExists = existingPageName.docs.find((doc) => doc.id !== originalDoc?.id)
          if (alreadyExists) {
            throw new APIError(
              `There is already a page with the name "${alreadyExists.pageName}"`,
              400,
              undefined,
              true,
            )
          }
        }
        if (data?.pageName) {
          const slug = data.pageName
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
          if (data?.pageGroup) {
            const dataPageGroup = await req.payload.findByID({
              collection: 'groupPage',
              id: data?.pageGroup,
            })
            data.pageKey = dataPageGroup?.groupKey + '/' + slug
          } else {
            data.pageKey = '/' + slug
          }
          if (data?.pageGroup !== null) {
            data.pageDefault = false
          }
        }
        if (Array.isArray(data?.pageSection)) {
          data.pageSection = data.pageSection.map((block) => {
            if (block.blockType === 'heroSection') {
              const greetingArray = block.greetings || []
              const updatedGreetings = greetingArray.map((g: any) => {
                if (g.hasIncludeImage !== true) {
                  g.imageGreeting = null
                }
                return g
              })
              block.greetings = updatedGreetings
            }
            return block
          })
        }
        // console.log('BeforeValidate Hook Triggered');
        // console.log(JSON.stringify(data, null, 2));
        return data
      },
    ],
    afterChange: [
      async ({ doc }) => {
        try {
          await connectRedis()

          const slug = doc.pageName
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()

          const pathname = doc.pageGroup ? `/${doc.pageGroup}/${slug}` : `/${slug}`

          const cacheKeyId = `pageCache:${pathname}:id`
          const cacheKeyEn = `pageCache:${pathname}:en`

          await client.del(cacheKeyId)
          await client.del(cacheKeyEn)

          console.log(`✅ Redis cache updated: ${cacheKeyId} and ${cacheKeyEn}`)
        } catch (err) {
          console.error('❌ Redis cache error:', err)
        }
      },
    ],
  },
}
