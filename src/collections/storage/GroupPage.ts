import type { CollectionConfig } from 'payload';
import { APIError } from 'payload';

export const GroupPage: CollectionConfig = {
  slug: 'groupPage',
  admin: {
    useAsTitle: 'groupKey',
    group: 'Storage',
  },
  fields: [
    {
      name: 'groupName',
      type: 'text',
      label: 'Group Name',
      required: true,
    },
    {
      name: 'groupKey',
      type: 'text',
      label: 'Group Key',
      admin: {
        readOnly: true,
      },
      defaultValue: 'Save first to get the key of this group',
    },
    {
      name: 'subGroupFrom',
      type: 'relationship',
      relationTo: 'groupPage',
      label: 'Select Sub Group From',
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data, req, originalDoc }) => {
        if (!data?.groupName) return data;

        const currentKey = data.groupName
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();

        let finalKey = `/${currentKey}`;

        if (data?.subGroupFrom) {

          const parentGroup = await req.payload.findByID({
            collection: 'groupPage',
            id: data?.subGroupFrom,
          });

          if (parentGroup?.groupKey) {
            finalKey = `${parentGroup.groupKey}/${currentKey}`;
          }
        }

        const existing = await req.payload.find({
          collection: 'groupPage',
          where: {
            groupKey: {
              equals: finalKey,
            },
          },
          depth: 0,
        });

        const isDuplicate = existing.docs.find(doc => doc.id !== originalDoc?.id);

        if (isDuplicate) {
          throw new APIError(
            `The current group name will create a key "${finalKey}", it is already available. Please choose a different group name or select a parent group.`,
            400,
            undefined,
            true
          );
        }

        data.groupKey = finalKey;
        return data;
      },
    ],
  },
};
