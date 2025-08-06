import { Fragment } from 'react'
import DynamicPage from '../_components/dynamicPage'
import { RefreshRouteOnSave } from '../RefreshRouteOnSave'

type Params = { slug?: string[] }

interface PageProps {
  params: Params
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: PageProps) {
  const slugArray = params?.slug
  const slugPath = slugArray ? `/${slugArray.join('/')}` : '/'

  const query = new URLSearchParams(searchParams as Record<string, string>).toString()
  const fullSlug = query ? `${slugPath}?${query}` : slugPath

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <DynamicPage slug={fullSlug} />
    </Fragment>
  )
}
