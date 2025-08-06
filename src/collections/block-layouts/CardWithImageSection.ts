import { colorPickerField } from '@innovixx/payload-color-picker-field'
import type { Block } from 'payload'

export const CardWithImageSection: Block = {
  slug: 'cardWithImageSection',
  imageURL: '/skeleton/cardWithImage.svg',
  interfaceName: 'Card With Image Section',
  labels: {
    singular: 'Card With Image Section',
    plural: 'Card With Image Sections',
  },
  fields: [
    {
      name: 'sectionTitle',
      label: 'Section Title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: '',
    },
    colorPickerField({
      name: 'headerColor',
      label: 'Header Color',
      required: true,
    }),
    {
      name: 'cardArray',
      label: 'Card Array',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'itemThumbnail',
          label: 'Item Thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'itemTitle',
          label: 'Item Title',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: '',
        },
        {
          name: 'itemDescription',
          label: 'Item Description',
          type: 'textarea',
          localized: true,
          defaultValue: '',
          required: true,
        },
      ],
    },
  ],
}
