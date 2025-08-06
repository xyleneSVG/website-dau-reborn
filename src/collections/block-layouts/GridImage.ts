import type { Block } from 'payload'

export const GridImageSection: Block = {
  slug: 'gridImageSection',
  imageURL: '/skeleton/gridImage.svg',
  labels: {
    singular: 'Grid Image Section',
    plural: 'Grid Image Sections',
  },
  interfaceName: 'Grid Image Section',
  fields: [
    {
      name: 'sectionTitle',
      type: 'richText',
      label: 'Section Title',
      localized: true,
    },
    {
      name: 'gridImage',
      label: 'Grid Image',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'imageDescription',
          type: 'text',
          label: 'Image Description',
          required: true,
          localized: true,
          defaultValue: '',
        },
      ],
    },
  ],
}
