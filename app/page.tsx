import SearchPage from '@/components/search/SearchPage'
import { Sidebar } from '@/components/Sidebar'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  searchParams
}: Props): Promise<Metadata> {
  const query = searchParams?.q
  return {
    title: query ? `Search: ${query} | enaiblr` : 'enaiblr - AI Tools Search Engine',
  }
}

export default function Page({ searchParams }: Props) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';
  return (
    <>
      <Sidebar />
      <SearchPage initialQuery={query} />
    </>
  )
}