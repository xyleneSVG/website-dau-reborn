import type { Block } from 'payload'

export const ThreeDimensionCarouselSection: Block = {
  slug: 'threeDimensionCarouselSection',
  imageURL: '/skeleton/threeDimensionCarousel.svg',
  labels: {
    singular: '3D Carousel Section',
    plural: '3D Carousel Sections',
  },
  interfaceName: '3D Carousel Section',
  fields: [
    {
      name: 'sectionTitle',
      type: 'richText',
      label: 'Section Title',
      localized: true,
    },
    {
      name: 'carouselItems',
      type: 'blocks',
      required: true,
      minRows: 3,
      maxRows: 3,
      admin: {
        description: 'Carousel items must be exactly 3',
      },
      blocks: [
        {
          slug: 'carouselItem',
          labels: {
            singular: 'Carousel Item',
            plural: 'Carousel Items',
          },
          fields: [
            {
              name: 'itemTitle',
              type: 'text',
              label: 'Item Title',
              required: true,
              localized: true,
              defaultValue: '',
            },
            {
              name: 'itemDescription',
              type: 'textarea',
              label: 'Item Description',
              required: true,
              localized: true,
              defaultValue: '',
            },
            {
              name: 'itemIcon',
              type: 'upload',
              relationTo: 'media',
              label: 'Item Icon',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
