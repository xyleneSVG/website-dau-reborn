import type { Block } from 'payload'

import { iconPickerField } from '@innovixx/payload-icon-picker-field'
import { customLucideIcon } from '@/admin/_fields/listIcon'
import { colorPickerField } from '@innovixx/payload-color-picker-field'

export const IconTextListWithImageSection: Block = {
  slug: 'iconTextListWithImageSection',
  labels: {
    singular: 'Icon Text List With Image Section',
    plural: 'Icon Text List With Image Sections',
  },
  imageURL: '/skeleton/iconTextListWithImage.svg',
  interfaceName: 'Icon Text List With Image Section',
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
      name: 'sectionIllustration',
      type: 'upload',
      label: 'Section Illustration',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'contentLists',
      type: 'blocks',
      required: true,
      label: 'Content Lists',
      blocks: [
        {
          slug: 'iconTextItem',
          labels: {
            singular: 'Icon Text Item',
            plural: 'Icon Text Items',
          },
          fields: [
            iconPickerField({
              name: 'itemIcon',
              label: 'Item Icon',
              required: true,
              icons: customLucideIcon,
            }),
            {
              name: 'itemTitle',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: '',
              label: 'Item Title',
            },
            {
              name: 'itemDescription',
              type: 'textarea',
              required: true,
              localized: true,
              defaultValue: '',
              label: 'Item Description',
            },
          ],
        },
      ],
    },
    colorPickerField({
      name: 'iconColor',
      label: 'Icon Color',
      admin: {
        description: 'Choose a color for this icon',
      },
    }),
    colorPickerField({
      name: 'backgroundIconColor',
      label: 'Background Icon Color',
      admin: {
        description: 'Choose a color for this background icon',
      },
    }),
  ],
}
