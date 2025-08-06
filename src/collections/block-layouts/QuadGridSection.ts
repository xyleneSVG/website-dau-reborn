import type { Block } from 'payload'

export const QuadGridSection: Block = {
  slug: 'quadGridSection',
  imageURL: '/skeleton/quadGrid.svg',
  labels: {
    singular: 'Quad Grid Section',
    plural: 'Quad Grid Sections',
  },
  interfaceName: 'Quad Grid Section',
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
      name: 'sectionSubtitle',
      type: 'text',
      label: 'Section Subtitle',
      required: true,
      localized: true,
      defaultValue: '',
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
          label: 'Item Image',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
