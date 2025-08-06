import type { Block } from 'payload'

export const ImageHeaderThreeColumnSection: Block = {
  slug: 'imageHeaderThreeColumnSection',
  imageURL: '/skeleton/imageHeaderThreeColumn.svg',
  labels: {
    singular: 'Image Header With Three Column Section',
    plural: 'Image Header With Three Column Sections',
  },
  interfaceName: 'Image Header Three Column Section',
  fields: [
    {
      name: 'sectionHeaderImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Section Header Image',
      required: true,
    },
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
      label: 'Grid List',
      admin: {
        description: 'Add 3 Grid',
      },
      minRows: 3,
      maxRows: 3,
      localized: true,
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
      ],
    },
  ],
}
