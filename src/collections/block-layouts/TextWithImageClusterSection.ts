import type { Block } from 'payload'

import { colorPickerField } from '@innovixx/payload-color-picker-field'
import { iconPickerField } from '@innovixx/payload-icon-picker-field'
import { customLucideIcon } from '@/admin/_fields/listIcon'

export const TextWithImageClusterSection: Block = {
  slug: 'textWithImageClusterSection',
  imageURL: '/skeleton/textWithImageCluster.svg',
  interfaceName: 'Text With Image Cluster Section',
  labels: {
    singular: 'Text With Image Cluster Section',
    plural: 'Text With Image Cluster Sections',
  },
  fields: [
    {
      name: 'imageLists',
      type: 'array',
      required: true,
      label: 'Image Lists',
      maxRows: 3,
      minRows: 1,
      admin: {
        description: 'Max 3 image',
      },
      fields: [
        {
          name: 'itemImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Item Image',
          required: true,
        },
      ],
    },
    {
      name: 'sectionHeadline',
      type: 'text',
      label: 'Section Headline',
      required: false,
      localized: true,
      defaultValue: '',
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
      name: 'sectionDescription',
      type: 'richText',
      label: 'Section Description',
      localized: true,
    },
    {
      name: 'hasButton',
      type: 'checkbox',
      label: 'Use button?',
      defaultValue: false,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      required: true,
      localized: true,
      defaultValue: '',
      admin: {
        condition: (_, siblingData) => siblingData?.hasButton === true,
      },
    },
    iconPickerField({
      name: 'buttonIcon',
      label: 'Button Icon',
      icons: customLucideIcon,
      admin: {
        condition: (_, siblingData) => siblingData?.hasButton === true,
      },
    }),
    {
      name: 'buttonLink',
      type: 'relationship',
      label: 'Button Reference Page',
      required: true,
      relationTo: 'pages',
      admin: {
        condition: (_, siblingData) => siblingData?.hasButton === true,
      },
    },
    colorPickerField({
      name: 'buttonColor',
      label: 'Button Color',
      required: true,
      admin: {
        description: 'Choose a color for this button',
        condition: (_, siblingData) => siblingData?.hasButton === true,
      },
    }),
    {
      type: 'collapsible',
      label: 'Reverse Layout Content?',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'reverseContent',
          type: 'checkbox',
          label: 'Enable',
          defaultValue: false,
          admin: {
            components: {
              Field: '@/admin/_components/example-of-change/reverseContentTextWithImageCluster',
            },
          },
        },
      ],
    },
    {
      name: 'hasBackground',
      type: 'checkbox',
      label: 'Enable background?',
      defaultValue: false,
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      required: true,
      admin: {
        description: 'Choose a color for this background page',
        condition: (_, siblingData) => siblingData?.hasBackground === true,
      },
    }),
  ],
}
