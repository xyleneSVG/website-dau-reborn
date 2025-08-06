import type { Block } from 'payload'

export const IconListWithSideImagesSection: Block = {
  slug: 'iconListWithSideImagesSection',
  imageURL: '/skeleton/iconListWithSideImages.svg',
  labels: {
    singular: 'Icon List With Side Images Section',
    plural: 'Icon List With Side Images Sections',
  },
  interfaceName: 'Icon List With Side Images Section',
  fields: [
    {
      name: 'sectionTitle',
      label: 'Section Title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: '',
    },
    {
      name: 'sectionIllustrationArray',
      dbName: 'illustrationArray',
      label: 'Section Illustration',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'sectionIllustration',
          type: 'upload',
          label: 'Section Illustration',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'sectionContent',
      label: 'Section Content',
      type: 'blocks',
      required: true,
      blocks: [
        {
          slug: 'contentItem',
          labels: {
            singular: 'Content Item',
            plural: 'Content Items',
          },
          fields: [
            {
              name: 'itemImage',
              label: 'Item Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'itemTitle',
              label: 'Item Title',
              type: 'text',
              required: true,
              defaultValue: '',
              localized: true,
            },
            {
              name: 'itemDescription',
              label: 'Item Description',
              type: 'textarea',
              required: true,
              defaultValue: '',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
