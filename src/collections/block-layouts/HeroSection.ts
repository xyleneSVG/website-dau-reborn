import type { Block } from 'payload'

export const HeroSection: Block = {
  slug: 'heroSection',
  imageURL: "/skeleton/heroSection.svg",
  interfaceName: 'Hero Section',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'greetingIllustrationLeft',
      label: "Greeting Illustration Left",
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'greetingIllustrationRight',
      label: "Greeting Illustration Right",
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'greetings',
      type: 'array',
      required: true,
      label: 'Greeting Lists',
      fields: [
        {
          name: 'hasIncludeImage',
          type: 'checkbox',
          label: 'Greetings on hero with image?',
          defaultValue: false,
        },
        {
          name: 'imageGreeting',
          type: 'upload',
          relationTo: 'media',
          validate: (val: any) => {
            if (!val) {
              return 'Image is required if Greetings on hero with image';
            }
            return true;
          },
          admin: {
            condition: (_, siblingData) => siblingData?.hasIncludeImage === true,
          },
        },
        {
          name: 'textGreeting',
          type: 'text',
          label: 'Text Greeting',
          required: true,
          defaultValue: '',
          localized: true
        },
      ]
    },
  ]
}