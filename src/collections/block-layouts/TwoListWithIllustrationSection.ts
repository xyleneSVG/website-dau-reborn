import { customLucideIcon } from '@/admin/_fields/listIcon'
import { colorPickerField } from '@innovixx/payload-color-picker-field'
import { iconPickerField } from '@innovixx/payload-icon-picker-field'
import type { Block } from 'payload'

export const TwoListWithIllustrationSection: Block = {
  slug: 'twoListWithIllustrationSection',
  imageURL: '/skeleton/twoListWithIllustration.svg',
  interfaceName: 'Two List With Illustration Section',
  labels: {
    singular: 'Two List With Illustration Section',
    plural: 'Two List With Illustration Sections',
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
    {
      name: 'sectionDescription',
      label: 'Section Description',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue: '',
    },
    {
      name: 'sectionIllustration',
      label: 'Section Illustration',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      label: 'Content Lists',
      type: 'group',
      fields: [
        {
          type: 'collapsible',
          label: 'Left Side List',
          fields: [
            {
              name: 'leftSideListTitle',
              label: 'Left Side List Title',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: '',
            },
            colorPickerField({
              name: 'leftSideListTitleColor',
              label: 'Left Side List Title Color',
              required: true,
            }),
            {
              name: 'leftSideListContentArray',
              dbName: 'left_list_arr',
              label: 'Left Side List Content Array',
              type: 'array',
              localized: true,
              minRows: 1,
              fields: [
                {
                  name: 'leftSideListContent',
                  label: 'Left Side List Content',
                  type: 'text',
                  required: true,
                },
              ],
            },
            colorPickerField({
              name: 'leftSideListColor',
              label: 'Left Side List Color',
              required: true,
            }),
          ],
        },
        {
          type: 'collapsible',
          label: 'Right Side List',
          fields: [
            {
              name: 'rightSideListTitle',
              label: 'Right Side List Title',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: '',
            },
            colorPickerField({
              name: 'rightSideListTitleColor',
              label: 'Right Side List Title Color',
              required: true,
            }),
            {
              name: 'rightSideListContentArray',
              dbName: 'right_list_arr',
              label: 'Right Side List Content Array',
              type: 'array',
              minRows: 1,
              localized: true,
              fields: [
                {
                  name: 'rightSideListContent',
                  label: 'Right Side List Content',
                  type: 'text',
                  required: true,
                },
              ],
            },
            colorPickerField({
              name: 'rightSideListColor',
              label: 'Right Side List Color',
              required: true,
            }),
          ],
        },
      ],
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
  ],
}
