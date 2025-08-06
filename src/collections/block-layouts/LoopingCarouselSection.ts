import type { Block } from 'payload'

export const LoopingCarouselSection: Block = {
  slug: 'loopingCarouselSection',
  imageURL: '/skeleton/loopingCarousel.svg',
  labels: {
    singular: 'Looping Carousel Section',
    plural: 'Looping Carousel Sections',
  },
  interfaceName: 'Looping Carousel Section',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      required: true,
      localized: true,
      defaultValue: '',
    },
    {
      name: 'carouselLists',
      type: 'array',
      required: true,
      label: 'Carousel Lists',
      fields: [
        {
          name: 'itemImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Item Image',
        },
      ],
    },
  ],
}
