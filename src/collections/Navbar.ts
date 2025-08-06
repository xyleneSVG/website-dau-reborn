import { customLucideIcon } from '@/admin/_fields/listIcon'
import { colorPickerField } from '@innovixx/payload-color-picker-field'
import { iconPickerField } from '@innovixx/payload-icon-picker-field'
import { APIError, CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'

export const Navbar: CollectionConfig = {
  slug: 'navbar',
  admin: {
    useAsTitle: 'layoutNavbar',
    group: 'Advance Configuration',
  },
  fields: [
    {
      name: 'active',
      label: 'Use this layout',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'layoutNavbar',
      label: 'Layout Navbar ID',
      type: 'text',
      defaultValue: () => uuidv4(),
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'navbarLogo',
      label: 'Navbar Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'navbarItemArray',
      label: 'Navbar Item Array',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'navbarItemName',
          label: 'Navbar Item Name',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: '',
        },
        {
          name: 'navbarItemReference',
          label: 'Navbar Item Reference',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return !siblingData.hasDropdown
            },
          },
        },
        {
          name: 'hasDropdown',
          label: 'Enable Dropdown',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'navbarDropdown',
          label: 'Navbar Dropdown',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.hasDropdown === true,
          },
          fields: [
            iconPickerField({
              name: 'itemDropdownIcon',
              label: 'Item Dropdown Icon',
              required: true,
              icons: customLucideIcon,
            }),
            {
              name: 'itemDropdownTitle',
              label: 'Item Dropdown Title',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: '',
            },
            {
              name: 'itemDropdownReference',
              label: 'Item Dropdown Reference',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
            },
          ],
        },
      ],
    },
    colorPickerField({
      name: 'accentColor',
      label: 'Accent Color',
      required: false,
    }),
    {
      name: 'hasButtonContact',
      label: 'Enable Button Contact',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'buttonContactReference',
      label: 'Button Contact Reference',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData?.hasButtonContact === true,
      },
    },
    colorPickerField({
      name: 'buttonContactColor',
      label: 'Button Contact Color',
      required: false,
      admin: {
        condition: (_, siblingData) => siblingData?.hasButtonContact === true,
      },
    }),
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        if (data?.active) {
          const existingActive = await req.payload.find({
            collection: 'navbar',
            where: {
              active: {
                equals: true,
              },
            },
            depth: 0,
          })

          const alreadyExists = existingActive.docs.find((doc) => doc.id !== originalDoc?.id)

          if (alreadyExists) {
            throw new APIError(
              `Navbar layout "${alreadyExists.layoutNavbar}" is already set as active. Only one active layout is allowed.`,
              400,
            )
          }
        }
      },
    ],
  },
}
