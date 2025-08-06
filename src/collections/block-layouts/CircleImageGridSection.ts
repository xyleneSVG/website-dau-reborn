import type { Block } from 'payload'

export const CircleImageGridSection: Block = {
  slug: 'circleImageGridSection',
  imageURL: '/skeleton/circleImageGrid.svg',
  labels: {
    singular: 'Circle Image Grid Section',
    plural: 'Circle Image Grid Sections',
  },
  interfaceName: 'Circle Image Grid Section',
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
      name: 'gridLists',
      type: 'array',
      label: 'Grid Lists',
      localized: true,
      fields: [
        {
          name: 'itemImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Item Image',
          required: true,
        },
        {
          name: 'itemName',
          type: 'text',
          label: 'Item Name',
          required: true,
          localized: true,
          defaultValue: '',
        },
        {
          name: 'itemDescription',
          type: 'text',
          label: 'Item Description',
          required: true,
          localized: true,
          defaultValue: '',
        },
      ],
    },
  ],
}
