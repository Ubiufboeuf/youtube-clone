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

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: title('Video') }
  ]
}

export async function clientLoader () {
  await import('dashjs')
  try {
    return await getAllVideos({ from: 0, to: 20 })
  } catch (err) {
    console.error(err)
    return []
  }
}

export default function Watch ({ loaderData }: Route.ComponentProps) {
  const [videosList] = useState<Video[]>(loaderData)
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

  function handleKeyUp (event: KeyboardEvent) {
    const { key } = event
    const lowerKey = key.toLowerCase()

    if ((watchRef.current?.contains(document.activeElement) || document.activeElement?.tagName !== 'INPUT') && lowerKey === 't') {
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
          h-[calc(100%-56px)] min-h-fit absolute right-0 w-full max-w-full grid gap-6 justify-items-center
        `}
        ref={watchRef}
      >
        <Player cinemaModeActive={cinemaModeActive} videoInfo={videoInfo} />
        <AsideRight videos={videosList} cinemaModeActive={cinemaModeActive} />
        <InfoAndComments />
      </div>
    </>
  )
}
