import { parseDuration, title } from '@/lib/utils'
import type { Route } from './+types/watch'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { getMediaById } from '@/lib/api'
import type { Media, Player } from '@/env'
import { MediaInfoFallback } from '@/components/watch/MediaInfoFallback'
import { MediaInfo } from '@/components/watch/MediaInfo'
import { MediaOptions } from '@/components/MediaOptions'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: title('Media') }
  ]
}

const defaultPlayer: Player = {
  currentTime: undefined,
  duration: 0,
  paused: true
}

export default function watch () {
  const playerElement = useRef<HTMLVideoElement>(null)
  const playerWrapperRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLInputElement>(null)
  const [mediaOption, setMediaOption] = useState<string>('')
  const [mediaInfo, setMediaInfo] = useState<Media>()
  const [player, setPlayer] = useState(defaultPlayer)

  useEffect(() => {
    console.log('effect')
    import('dashjs').then(async (dashjs) => {
      const url = new URL(window.location.href)
      const mediaId = url.searchParams.get('v')
      const t = url.searchParams.get('t')
      if (!mediaId) return
      const newMedia = await getMediaById(mediaId)
      const newMediaOption = Object.values(newMedia.sources).at(0) ?? ''
      setMediaInfo(newMedia)
      setMediaOption(newMediaOption)
      setPlayer({
        currentTime: newMedia.timeSeen,
        duration: newMedia.duration,
        paused: true
      })

      if (!playerElement.current) return
      const mediaSource = `${newMediaOption}/output.mpd`
      const mediaElement = dashjs.MediaPlayer().create()
      mediaElement.initialize(playerElement.current, mediaSource, true, t ?? mediaInfo?.timeSeen ?? 0)
    })
  }, [])

  function togglePlay () {
    if (playerElement.current?.paused) {
      playerElement.current?.play()
    } else {
      playerElement.current?.pause()
    }
  }

  function handlePlaying () {
    const togglePlay = controlsRef.current?.querySelector('#togglePlay')
    if (togglePlay) togglePlay.textContent = 'Playing'
    setPlayer({...player, paused: false})
  }

  function handlePause () {
    const togglePlay = controlsRef.current?.querySelector('#togglePlay')
    if (togglePlay) togglePlay.textContent = 'Paused'
    setPlayer({...player, paused: true})
  }

  function updateCurrentTime (event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setPlayer({...player, currentTime: Number(value)})
    if (playerElement.current) playerElement.current.currentTime = Number(value)
  }

  function handleTimeUpdate (event: ChangeEvent<HTMLVideoElement>) {
    const { target } = event
    setPlayer({...player, currentTime: target.currentTime})
    if (sliderRef.current) sliderRef.current.value = target.currentTime.toString()
  }

  return (
    <>
      <div className='h-[2000px]'>
        <main ref={playerWrapperRef} className='h-120 bg-black flex items-center justify-center relative'>
          <div className='relative h-full w-fit'>
            <video
              ref={playerElement}
              id='videoElement'
              className='h-full w-auto bg-transparent aspect-square'
              onPlaying={handlePlaying}
              onPause={handlePause}
              onTimeUpdate={handleTimeUpdate}
            />
            {/* <button id='start' onClick={togglePlay} className='absolute z-10 h-full w-full left-0 top-0'></button> */}
            <div id='posterWrapper' className='absolute left-1/2 top-1/2 [transform:translate(-50%,-50%)] h-full w-full'>
              { mediaInfo?.poster && <img src={mediaInfo?.poster} /> }
            </div>
          </div>
          { mediaInfo && <MediaOptions mediaInfo={mediaInfo} /> }
          <div ref={controlsRef} id='controls' className='absolute z-20 bottom-0 h-14 w-full bg-[#000c] px-6 py-1'>
            <input
              ref={sliderRef}
              id='slider'
              type='range'
              step={0.1}
              max={mediaInfo?.duration}
              min={0}
              className='absolute top-0 left-[50%] [transform:translateX(-50%)] w-[calc(100%-48px)] h-0.5 bg-white accent-red-500'
              defaultValue={mediaInfo?.timeSeen}
              onInput={updateCurrentTime}
              onMouseDown={playerElement.current?.pause}
              onMouseUp={playerElement.current?.play}
            />
            <div className='h-full flex-1'>
              <button id='togglePlay' onClick={togglePlay}>Paused</button>
              <div>
                <time id='currentTime'>{parseDuration(Math.floor(player.currentTime ?? mediaInfo?.timeSeen ?? 0))}</time>
                /
                <time id='duration'>{parseDuration(player.duration)}</time>
              </div>
            </div>
          </div>
        </main>
        <section className='w-full h-full min-h-fit flex justify-between max-w-[3840px] mx-auto gap-0'>
          <div className='w-full flex-1 h-full min-h-fit px-8 py-6'>
            <header id='mediaInfo' className='h-32 w-full bg-neutral-700 rounded-xl px-4 py-3'>
              { mediaInfo ? <MediaInfo media={mediaInfo} /> : <MediaInfoFallback /> }
            </header>
            <section id='comments'>

            </section>
          </div>
          <div id='recomendedVideos' className='w-112 bg-red-700 h-full min-h-fit'>
            
          </div>
        </section>
      </div>
    </>
  )
}
