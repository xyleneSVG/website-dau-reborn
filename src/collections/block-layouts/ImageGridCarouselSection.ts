import type { Block } from 'payload'

export const ImageGridCarouselSection: Block = {
  slug: 'imageGridCarouselSection',
  imageURL: "/skeleton/imageGridCarousel.svg",
  interfaceName: 'Image Grid Carousel Section',
  labels: {
    singular: 'Image Grid Carousel Section',
    plural: 'Image Grid Carousel Sections',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      required: true,
      localized: true,
      defaultValue: ''
    },
    {
      name: 'gridLists',
      type: 'array',
      required: true,
      label: 'Grid Lists',
      fields: [
        {
          name: 'itemImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Item Image',
        },
      ]
    },
  ]
}