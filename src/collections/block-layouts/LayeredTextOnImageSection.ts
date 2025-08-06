import type { Block } from 'payload'

export const LayeredTextOnImageSection: Block = {
  slug: 'layeredTextOnImageSection',
  imageURL: '/skeleton/layeredTextOnImageSection.svg',
  interfaceName: 'Layered Text On Image Section',
  labels: {
    singular: 'Layered Text On Image Section',
    plural: 'Layered Text On Image Sections',
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
      name: 'sectionSubtitle',
      type: 'text',
      label: 'Section Subtitle',
      required: true,
      localized: true,
      defaultValue: ''
    },
    {
      name: 'sectionBackground',
      type: 'upload',
      relationTo: 'media',
      label: 'Section Background',
      required: true,
    }
  ],
}
