import { title } from '@/lib/utils'
import type { Route } from './+types/watch'
import { useEffect, useRef, useState } from 'react'
import { getAllVideos, getVideoById } from '@/lib/api'
import type { Video } from '@/env'
import { Player } from '@/components/Player'
import { useVideoInfoStore } from '@/stores/useVideoInfoStore'
import { useLocation } from 'react-router'
import { AsideMenuMini } from '@/components/Home/AsideMenuMini'
import { AsideRight } from '@/components/watch/AsideRight'
import { InfoAndComments } from '@/components/watch/InfoAndComments'
import { DATA_VIDEO_ENDPOINT } from '@/lib/constants'

export async function clientLoader () {
  let dashjs
  try {
    dashjs = await import('dashjs')
  } catch (err) {
    console.error(err)
  }

  let videos
  try {
    videos = await getAllVideos({ from: 0, to: 20 })
  } catch (err) {
    console.error(err)
  }

  let videoTitle = ''
  try {
    const search = new URLSearchParams(document.location.search)
    const id = search.get('v')
    const res = await fetch(`${DATA_VIDEO_ENDPOINT}?id=${id}&prop=title`)
    videoTitle = (await res.json()).value
    console.log({videoTitle})
  } catch (err) {
    console.error(err)
  }

  document.title = videoTitle

  return { dashjs, videos: videos ?? [] }
}

export default function Watch ({ loaderData }: Route.ComponentProps) {
  const [videosList] = useState<Video[]>(loaderData.videos)
  const [cinemaModeActive, setCinemaModeActive] = useState<boolean>(false)
  const videoInfo = useVideoInfoStore((state) => state.videoInfo)
  const updateVideoInfo = useVideoInfoStore((state) => state.updateVideoInfo)
  const location = useLocation()
  const watchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getVideoInfo()
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    if (videoInfo?.title) {
      document.title = title(videoInfo?.title) || ''
    }
  }, [videoInfo])

  function handleKeyUp (event: KeyboardEvent) {
    const { key } = event
    const lowerKey = key.toLowerCase()

    if (
      (
        watchRef.current?.contains(document.activeElement) ||
        document.activeElement?.tagName !== 'INPUT'
      ) && lowerKey === 't'
    ) {
      toggleCinemaMode()
    }
  }

  function toggleCinemaMode () {
    console.log(cinemaModeActive)
    setCinemaModeActive(cinemaModeActive => !cinemaModeActive)
  }

  async function getVideoInfo () {
    const search = new URLSearchParams(location.search)
    const id = search.get('v')
    if (id) {
      try {
        const video = await getVideoById(id)
        if (video) {
          updateVideoInfo(video)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <>
      <AsideMenuMini />
      <div
        id='watch'
        className={`
          ${cinemaModeActive ? '' : 'p-4 pb-0'}
          h-[calc(100%-56px)] min-h-fit absolute right-0 w-full max-w-full grid gap-6 justify-items-center ml:asideOpened:w-navbar ml:[grid-template-areas:'player_aside''extra_aside'] [grid-template-areas:'player''aside'] ml:grid-cols-[2fr_1fr]
        `}
        ref={watchRef}
      >
        <Player cinemaModeActive={cinemaModeActive} videoInfo={videoInfo} dashjs={loaderData.dashjs} />
        <AsideRight videos={videosList} cinemaModeActive={cinemaModeActive} />
        <InfoAndComments />
      </div>
    </>
  )
}
