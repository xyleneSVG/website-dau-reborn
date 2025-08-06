import { colorPickerField } from '@innovixx/payload-color-picker-field'
import type { Block } from 'payload'

export const ImageWithCarouselSection: Block = {
  slug: 'imageWithCarouselSection',
  imageURL: '/skeleton/imageWithCarousel.svg',
  labels: {
    singular: 'Image With Carousel Section',
    plural: 'Image With Carousel Sections',
  },
  interfaceName: 'Image With Carousel Section',
  fields: [
    {
      name: 'sectionTitle',
      label: 'Section Title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: ''
    },
    {
      name: 'sectionDescription',
      label: 'Section Description',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue: ''
    },
    {
      name: 'sectionIllustration',
      label: 'Section Illustration',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      required: true,
    }),
    {
      name: 'carouselImage',
      label: 'Carousel Image',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'itemImage',
          label: 'Item Image',
          type: 'upload',
          relationTo: 'media',
          required: true
        },
      ],
    },
  ],
}
