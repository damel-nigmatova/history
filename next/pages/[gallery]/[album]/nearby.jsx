import Head from 'next/head'
import styled from 'styled-components'

// import { get as getAlbums } from '../../../src/lib/albums'
// import { get as getAlbum } from '../../../src/lib/album'
// import { get as getGalleries } from '../../../src/lib/galleries'

// async function buildStaticPaths() {
//   const { galleries } = await getGalleries()
//   const groups = await Promise.all(galleries.map(async (gallery) => {
//     const { albums } = await getAlbums(gallery)
//     return albums.map(({ name: album }) => ({ params: { gallery, album } }))
//   }))
//   return groups.flat()
// }

// export async function getStaticProps({ params: { gallery, album } }) {
//   const { album: albumDoc } = await getAlbum(gallery, album)
//   const preparedItems = albumDoc.items.map((item) => ({
//     ...item,
//     corpus: [item.description, item.caption, item.location, item.city, item.search].join(' '),
//   }))
//   return {
//     props: { items: preparedItems },
//   }
// }

// export async function getStaticPaths() {
//   return {
//     paths: await buildStaticPaths(),
//     fallback: false,
//   }
// }

// eslint-disable-next-line max-len
// Add a new page at /demo/sample/nearby *where demo is the dynamic gallery name and sample is the dynamic album name. The page should have a page title and hello world styled with CSS using styled components

const NearbyHeading = styled.h1`
  font-size: 50px;
  font-family: Verdana,sans-serif;
  color: blue;
`
function NearbyPage() {
  return (
    <div>
      <Head>
        <title>History App - Nearby Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NearbyHeading> Hello World </NearbyHeading>
    </div>
  )
}

export default NearbyPage
