export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import { RefreshRouteOnSave } from './RefreshRouteOnSave'
import configPromise from '@payload-config'

import DynamicPage from './_components/dynamicPage'
import NotFound from './_components/NotFound'
import { Fragment } from 'react'

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function HomeRedirectPage({ searchParams }: PageProps) {
  const payload = await getPayload({ config: await configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: {
      pageDefault: {
        equals: true,
      },
    },
    sort: '-createdAt',
    limit: 1,
  })

  const page = result.docs?.[0]

  if (page?.pageKey) {
    const query = new URLSearchParams(searchParams as Record<string, string>).toString()
    const fullPath = query ? `${page.pageKey}?${query}` : page.pageKey

    return (
      <Fragment>
        <RefreshRouteOnSave />
        <DynamicPage slug={fullPath} />
      </Fragment>
    )
  }

  return <NotFound />
}
