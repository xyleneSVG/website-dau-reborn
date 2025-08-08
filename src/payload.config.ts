// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/storage/Media'
import { GroupPage } from './collections/storage/GroupPage'
import { ReciveMessage } from './collections/ReciveMessage'
import { Pages } from './collections/Pages'
import { Navbar } from './collections/Navbar'
import { Footer } from './collections/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        if (collectionConfig?.slug === 'pages') {
          const key = data?.pageKey?.startsWith('/') ? data.pageKey : `${data?.pageKey || ''}`
          return `${process.env.NEXT_PUBLIC_SERVER_URL}${key}`
        }
        if (collectionConfig?.slug === 'navbar' || collectionConfig?.slug === 'footer') {
          return `${process.env.NEXT_PUBLIC_SERVER_URL}`
        }
        return process.env.NEXT_PUBLIC_SERVER_URL || ''
      },
      collections: ['pages', 'navbar', 'footer'],
    },
  },
  collections: [Pages, Navbar, Footer, ReciveMessage, Users, Media, GroupPage],
  localization: {
    locales: [
      {
        label: {
          en: 'English',
          id: 'Inggris',
        },
        code: 'en',
      },
      {
        label: {
          en: 'Indonesia',
          id: 'Indonesia',
        },
        code: 'id',
      },
    ],
    defaultLocale: 'id',
    fallback: false,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.NEXT_PUBLIC_S3_BUCKET || 'default-bucket',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT || '',
        region: process.env.S3_REGION || 'us-east-1',
        forcePathStyle: true,
      },
    }),
  ],
})
