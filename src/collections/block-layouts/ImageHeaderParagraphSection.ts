import type { Block } from 'payload'

export const ImageHeaderParagraphSection: Block = {
  slug: 'imageHeaderParagraphSection',
  imageURL: "/skeleton/imageHeaderParagraph.svg",
  interfaceName: 'Image Header Paragraph Section',
  fields: [
    {
      name: 'sectionImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Section Image',
      required: true
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      required: true,
      localized: true,
      defaultValue: ''
    },
    {
      name: 'sectionParagraph',
      type: 'richText',
      label: 'Section Paragraph',
      localized: true,
    }
  ]
}