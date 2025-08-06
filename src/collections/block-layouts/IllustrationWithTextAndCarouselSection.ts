import type { Block } from 'payload'

export const IllustrationWithTextAndCarouselSection: Block = {
  slug: 'illustrationWithTextAndCarouselSection',
  dbName: 'illustrationTextCarousel',
  imageURL: '/skeleton/illustrationWithTextAndCarousel.svg',
  labels: {
    singular: 'Illustration With Text and Carousel Section',
    plural: 'Illustration With Text and Carousel Sections',
  },
  interfaceName: 'Illustration With Text and Carousel Section',
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
      name: 'sectionDescription',
      type: 'text',
      label: 'Section Description',
      required: true,
      localized: true,
      defaultValue: '',
    },
    {
      name: 'carouselLists',
      type: 'array',
      required: true,
      localized: true,
      label: 'Carousel Lists',
      fields: [
        {
          name: 'carouselImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Carousel Image',
        },
        {
          name: 'carouselTitle',
          type: 'text',
          required: true,
          defaultValue: '',
          label: 'Carousel Title',
        },
        {
          name: 'carouselDescription',
          type: 'text',
          required: true,
          defaultValue: '',
          label: 'Carousel Description',
        },
      ],
    },
  ],
}
