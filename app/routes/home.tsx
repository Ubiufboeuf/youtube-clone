import { title } from '@/lib/utils'
import type { Route } from './+types/home'
import { HomeNav } from '@/components/home/HomeNav'
import VideoCardFallback from '@/components/VideoCardFallback'
import VideoCard from '@/components/VideoCard'
import { useEffect, useState } from 'react'
import type { Video } from '@/env'
import { getAllVideos } from '@/lib/api'
import { v4 as uuidv4 } from 'uuid'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: title() }
  ]
}

export default function home () {
  const [videosSugeridos, setVideosSugeridos] = useState<Video[]>()

  useEffect(() => {
    asyncSetVideosSugeridos()
  }, [])

  async function asyncSetVideosSugeridos () {
    getAllVideos()
      // .then(res => res.json())
      .then(data => {
        // setVideosSugeridos(data)
        setVideosSugeridos(data)
      })
      .catch(() => {
        console.error('Error consiguiendo los videos')
      })
  }

  return (
    <>
      <HomeNav />
      <section id='homeVideos' className='absolute top-28 right-0 [transition:width_250ms_ease] flex h-full w-full ml:w-[var(--nav-width)]'>
        <div className='min-h-full h-fit w-full max-w-full grid grid-cols-[min(100%,500px)] ms:grid-cols-[repeat(auto-fill,minmax(312px,1fr))] sm:p-6 ms:gap-4 justify-center items-start'>
          {
            videosSugeridos && videosSugeridos.map(video => {
              return (
                <VideoCard key={uuidv4()} video={video} />
              )
            })
          }
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
          <VideoCardFallback />
        </div>
      </section>
    </>
  )
}
