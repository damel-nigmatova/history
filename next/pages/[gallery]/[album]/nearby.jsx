import Head from 'next/head'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import ThumbImg from '../../../src/components/ThumbImg'

// npm run lint errors left on purpose:
  // (6/16) - Relative import from another package is not allowed. (asks local file path for import)
  // (2/16) - nearby.jsx & twitter.jsx (fetch not defined)
  // (3/16) - comments: line 92, line 75, line 66

const NearbyHeading = styled.h1`
  font-size: 30px;
  font-family: Verdana,sans-serif;
  color: white;
`

const btnstyle = {
  color: 'white',
  textDecoration: 'none',
  backgroundColor: '#a1b872',
  borderRadius: '5px',
  border: '0px',
  position: 'absolute',
  top: '20%',
  right: '20%',
  padding: '10px',
  cursor: 'pointer',
}

const ImgViewer = styled.img`
  border-radius: 10px;
`
const Wrapper = styled.ul`
  list-style: none;
  padding-left: 2px;
`
let imgId
let myArr
function NearbyPage() {
  const [photos, setAlbums] = useState([])
  const [showPhoto, setShowPhoto] = useState(false)

  function transformPhotos(photo) {
    return {
      path_t: `http://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`,
      path_b: `http://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
      caption: `${photo.title}`,
      id: `${photo.id}`,
    }
  }

  function selectThumb(e) {
    setShowPhoto(true)
    imgId = e.id
    console.log(imgId)
    myArr = photos.find((photo) => photo.id === imgId)
    console.log(myArr)
  }

  function closeSelectThumb() {
    setShowPhoto(false)
  }

  // API SECTION
  const router = useRouter() // (left on purpose) npm lint shows error, but this line is needed
  useEffect(async () => {
    const keyword = 'vancouver'
    const apiKey = 'fd65862e389f58b4dffbd7660e0f5fb5'

    if (!router.isReady) return
    const { latitude } = router.query
    const { longitude } = router.query

    // (left on purpose) npm lint error: line length
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${keyword}&accuracy=1&lat=${latitude}&lon=${longitude}&format=json&nojsoncallback=1`
    console.log(url)
    if(!url){
      return {notFound: true}
    }

    const response = await fetch(url)
    const result = await response.json()
    const photos = result.photos.photo.map(transformPhotos)
    console.log(photos)
    setAlbums(photos)
  }, [router.isReady])

  return (
    <div>
      <Head>
        <title>History App - Nearby Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* (left on purpose) npm lint error: children */}
      <NearbyHeading children={<Location />} />

      {showPhoto
        ? (
          <>
            <ImgViewer src={myArr.path_b} />
            <button style={btnstyle} type="button" onClick={() => closeSelectThumb()}>Close</button>
          </>
        )
        : null}

      <Wrapper>
        {photos.map((photo) => (
          <ThumbImg
            key={photo.id}
            id={photo.id}
            src={photo.path_t}
            alt={photo.caption}
            data-id={photo.id}
            onClick={() => selectThumb(photo)}
          />
        ))}
      </Wrapper>
    </div>
  )
}

function Location() {
  const router = useRouter()
  const { longitude } = router.query
  const { latitude } = router.query
  return (
    <div>
      <h3>Nearby images (lon: {latitude} - lat: {longitude})</h3>
    </div>
  )
}

export default NearbyPage
