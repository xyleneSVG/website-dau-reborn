import type { Block } from 'payload'

export const ZigZagListSection: Block = {
  slug: 'zigZagListSection',
  imageURL: '/skeleton/zigZagLists.svg',
  labels: {
    singular: 'Zig Zag Lists Section',
    plural: 'Zig Zag Lists Sections',
  },
  interfaceName: 'Zig Zag Lists Section',
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
      name: 'contentLists',
      type: 'array',
      required: true,
      label: 'Content Lists',
      fields: [
        {
          name: 'contentListTitle',
          type: 'text',
          label: 'Content Title',
          required: true,
          localized: true,
          defaultValue: '',
        },
        {
          name: 'contentListDescription',
          type: 'textarea',
          label: 'Content Description',
          required: true,
          localized: true,
          defaultValue: '',
        },
        {
          name: 'contentListIcon',
          type: 'upload',
          relationTo: 'media',
          label: 'Content Icon',
          required: true,
        },
        {
          name: 'contentReferencePage',
          type: 'relationship',
          relationTo: 'pages',
          label: 'Content Reference Page',
          admin: {
            description:
              'Select the page that explains about this service (make sure the page already exists)',
          },
        },
      ],
    },
  ],
}
