import { colorPickerField } from '@innovixx/payload-color-picker-field'
import type { Block } from 'payload'

export const ContactSection: Block = {
  slug: 'contactSection',
  imageURL: '/skeleton/contact.svg',
  interfaceName: 'Contact Section',
  fields: [
    {
      name: 'sectionIllustration',
      label: 'Section Illustration',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'sectionLabel',
      type: 'text',
      label: 'Section Label',
      required: true,
      localized: true,
      defaultValue: '',
    },
    {
      name: 'sectionHeadline',
      type: 'text',
      label: 'Section Headline',
      required: true,
      localized: true,
      defaultValue: '',
    },
    {
      name: 'sectionDescription',
      type: 'text',
      label: 'Section Description',
      required: true,
      localized: true,
      defaultValue: '',
    },
    colorPickerField({
      name: 'buttonSectionColor',
      label: 'Button Section Color',
      required: false,
      defaultValue: '#00DB05',
    }),
    {
      name: 'fieldsForm',
      type: 'array',
      label: 'Fields Form',
      required: true,
      fields: [
        {
          name: 'fieldLayout',
          label: 'Field Layout',
          type: 'select',
          options: [
            { label: 'Single', value: 'single' },
            { label: 'Double', value: 'double' },
          ],
          required: true,
        },
        {
          name: 'fieldId',
          label: 'Field ID',
          type: 'text',
          required: true,
        },
        {
          name: 'fieldLabel',
          label: 'Field Label',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: '',
        },
        {
          name: 'fieldTypeSingle',
          label: 'Field Type (Single Layout)',
          type: 'select',
          admin: {
            condition: (_, siblingData) => siblingData?.fieldLayout === 'single',
          },
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Number', value: 'number' },
            { label: 'Email', value: 'email' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Radio', value: 'radio' },
          ],
          required: true,
        },
        {
          name: 'fieldPlaceholder',
          label: 'Field Placeholder',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: '',
          admin: {
            condition: (_, siblingData) => siblingData?.fieldTypeSingle !== 'radio',
          },
        },
        {
          name: 'fieldTypeDouble',
          label: 'Field Type (Double Layout)',
          type: 'select',
          admin: {
            condition: (_, siblingData) => siblingData?.fieldLayout === 'double',
          },
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Number', value: 'number' },
          ],
          required: true,
        },
        {
          name: 'fieldRequired',
          label: 'Field Required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'fieldRadioOptions',
          label: 'Options for Radio',
          type: 'array',
          localized: true, 
          admin: {
            condition: (_, siblingData) =>
              siblingData?.fieldLayout === 'single' && siblingData?.fieldTypeSingle === 'radio',
          },
          fields: [
            {
              name: 'optionRadioValue',
              type: 'text',
              label: 'Option ID',
              required: true,
            },
            {
              name: 'optionRadioLabel',
              type: 'text',
              label: 'Option Label',
              required: true,
              localized: false,
              defaultValue: '',
            },
          ],
          required: true,
        },
        {
          name: 'subFields',
          label: 'Sub Fields for Double Layout',
          type: 'array',
          maxRows: 1,
          admin: {
            condition: (_, siblingData) => siblingData?.fieldLayout === 'double',
          },
          fields: [
            {
              name: 'subFieldId',
              label: 'Sub Field ID',
              type: 'text',
              required: true,
            },
            {
              name: 'subFieldLabel',
              label: 'Sub Field Label',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: '',
            },
            {
              name: 'subFieldPlaceholder',
              label: 'Sub Field Placeholder',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: '',
            },
            {
              name: 'subFieldType',
              dbName: 'subType',
              label: 'Sub Field Type',
              type: 'select',
              required: true,
              options: [
                { label: 'Text', value: 'text' },
                { label: 'Email', value: 'email' },
                { label: 'Number', value: 'number' },
              ],
            },
            {
              name: 'subFieldRequired',
              label: 'Sub Field Required',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
