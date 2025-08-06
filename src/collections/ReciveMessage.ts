import type { CollectionConfig } from 'payload'

export const ReciveMessage: CollectionConfig = {
  slug: 'reciveMessage',
  admin: {
    useAsTitle: 'recivedData',
    group: 'Recive Message',
  },
  fields: [
    {
      name: 'recivedData',
      label: 'Recived Message',
      type: "json",
      admin: {
        components: {
          Cell: 'src/admin/_components/recivedMessageFromJson.tsx',
        }
      }
    }
  ]
}
