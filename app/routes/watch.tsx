import { title } from '@/lib/utils'
import type { Route } from './+types/watch'
import { useEffect, useState } from 'react'
import { getAllVideos } from '@/lib/api'
import type { Video } from '@/env'
import { VideoInfoFallback } from '@/components/watch/VideoInfoFallback'
import { VideoInfo } from '@/components/watch/VideoInfo'
import VideoCard from '@/components/VideoCard'
import { Player } from '@/components/Player'
import { useVideoInfoStore } from '@/stores/useVideoInfoStore'
import { useSearchParamsStore } from '@/stores/useSearchParamsStore'
// import { useSearchParams } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: title('Video') }
  ]
}

export default function Watch () {
  const [videosList, setVideosList] = useState<Video[]>()
  const videoInfo = useVideoInfoStore((state) => state.videoInfo)
  const videoId = useSearchParamsStore((state) => state.videoId)
  const updateVideoId = useSearchParamsStore((state) => state.updateVideoId)

  useEffect(() => {
    getRecommendedVideos()
  }, [])

  async function getRecommendedVideos () {
    // const videosCardInfo = useMemo(async () => {
    //   getAllVideos()
    // }, [videoId])
    
    setVideosList(await getAllVideos({ from: 0, to: 20 }))
  }

  return (
    <>
      <div id='watch' className='h-[2000px]'>
        <Player videoInfo={videoInfo} />
        <section className='w-full h-full min-h-fit flex justify-between max-w-[3840px] mx-auto gap-0'>
          <div className='w-full flex-1 h-full min-h-fit px-8 py-6'>
            <header id='videoInfo' className='h-32 min-h-fit w-full bg-neutral-700 rounded-xl px-4 py-3'>
              { videoInfo ? <VideoInfo video={videoInfo} /> : <VideoInfoFallback /> }
              {
                videoInfo.poster && (
                  <img
                    className='h-fit w-full object-cover flex pointer-events-none select-none'
                    src={videoInfo.poster}
                    alt={videoInfo.title}
                  />
                )
              }
            </header>
            <section id='comments'>

            </section>
          </div>
          <div id='recommendedVideos' className='w-112 h-full min-h-fit'>
            {
              videosList?.length && videosList?.length > 0 && (
                videosList.map(video => {
                  return <VideoCard key={uuidv4()} video={video} />
                })
              )
            }
          </div>
        </section>
      </div>
    </>
  )
}
