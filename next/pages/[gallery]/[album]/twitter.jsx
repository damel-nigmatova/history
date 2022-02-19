import Head from 'next/head'
import { useEffect, useState } from 'react'

function TwitterPage() {
  const [tweets, setTweets] = useState([])

  useEffect(async () => {
    const response = await fetch('http://localhost:3030/api/twitter')
    const result = await response.json()
    setTweets(result.tweets)
  }, [])

  return (
    <div>
      <Head>
        <title>History App - Nearby Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {tweets.map((tweet) => <div><span>{tweet.date}</span><p>{tweet.text}</p></div>)}
      </div>
    </div>
  )
}

export default TwitterPage
