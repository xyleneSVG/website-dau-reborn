import { client, connectRedis } from '@/app/lib/redis'
import { APIError, CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'

export const Footer: CollectionConfig = {
  slug: 'footer',
  admin: {
    useAsTitle: 'layoutFooter',
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
      name: 'layoutFooter',
      label: 'Layout Footer ID',
      type: 'text',
      defaultValue: () => uuidv4(),
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'footerLogo',
      label: 'Footer Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'footerTitle',
      label: 'Footer Title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: '',
    },
    {
      name: 'footerDescription',
      label: 'Footer Description',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue: '',
    },
    {
      name: 'footerNavigation',
      label: 'Footer Navigation',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'navigationGroupTitle',
          label: 'Navigation Group Title',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: '',
        },
        {
          name: 'navigationGroupItem',
          label: 'Navigation Group Item',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'navigationPageName',
              label: 'Page Name',
              type: 'text',
              required: true,
              localized: true,
              defaultValue: '',
            },
            {
              name: 'navigationPageReference',
              label: 'Page Reference',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        if (data?.active) {
          const existingActive = await req.payload.find({
            collection: 'footer',
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
              `Footer layout "${alreadyExists.layoutFooter}" is already set as active. Only one active layout is allowed.`,
              400,
            )
          }
        }
      },
    ],
    afterChange: [
      async () => {
        try {
          await connectRedis()
          const cacheKeyId = `footerCache:id`
          const cacheKeyEn = `footerCache:en`
          await client.del(cacheKeyId)
          await client.del(cacheKeyEn)

          console.log(`✅ Redis cache updated: ${cacheKeyId} and ${cacheKeyEn}`)
        } catch (err) {
          console.error('❌ Redis cache error:', err)
        }
      },
    ],
  },
}
