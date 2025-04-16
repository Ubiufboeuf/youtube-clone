import { getVideoById } from '@/lib/api'
import { parseDuration } from '@/lib/utils'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { VideoQualities } from './VideoQualities'
import type { Video } from '@/env'
import { useVideoInfoStore } from '@/stores/useVideoInfoStore'
import { useSearchParamsStore } from '@/stores/useSearchParamsStore'

export function Player ({ videoInfo }: { videoInfo: Video }) {
  const videoElementRef = useRef<HTMLVideoElement>(null)
  const videoElementWrapperRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLInputElement>(null)

  const updateVideoInfo = useVideoInfoStore((state) => state.updateVideoInfo)

  const currentTime = usePlayerStore((state) => state.currentTime)
  const duration = usePlayerStore((state) => state.duration)
  const paused = usePlayerStore((state) => state.paused)
  const setCurrentTime = usePlayerStore((state) => state.updateCurrentTime)
  const setDuration = usePlayerStore((state) => state.updateDuration)
  const setPaused = usePlayerStore((state) => state.updatePaused)

  const videoId = useSearchParamsStore((state) => state.videoId)
  const updateVideoId = useSearchParamsStore((state) => state.updateVideoId)

  const [videoQuality, setVideoQuality] = useState<string>('')
  const [player, setPlayer] = useState()
  const [url, setURL] = useState<URL>()
  const [dashjs, setDashjs] = useState(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    setURL(url)
    const videoId = url.searchParams.get('v')
    if (!videoId) return
    updateVideoId(videoId)

    import('dashjs')
      .then(data => {
        console.log('dashjs: ', data)
      })
  }, [])

  useEffect(() => {
    if (!videoId) return
    setNewVideoSource()
  }, [videoId])

  async function setNewVideoSource () {
    if (!videoId) return
    const t = url?.searchParams.get('t')
    const newVideoInfo = await getVideoById(videoId)
    if (!newVideoInfo) {
      console.error('No hay información del video')
      return
    }
    updateVideoInfo(newVideoInfo)
    const newVideoQuality = newVideoInfo?.selectedQuality ?? newVideoInfo?.qualities[0]
    /*                     ↑ eso va por usuario, debería cambiarlo, pero aún no tengo usuarios */
    if (!newVideoQuality) {
      console.error('El video no tiene opciones de visualización')
      return
    }
    setVideoQuality(newVideoQuality)
    setCurrentTime(newVideoInfo.timeSeen)
    setDuration(newVideoInfo.duration)
    setPaused(true)
    if (!videoElementRef.current) return
    // const videoSource = `${SERVER_URL}/videos/${newVideoInfo.id}/manifest.mpd`
    initializePlayer(player, t ?? 0)
  }

  function initializePlayer (player: MediaPlayerClass | undefined, t?: string | number) {
    if (player) {
      player.initialize(videoElementRef.current, videoInfo.source, true, t ?? videoInfo?.timeSeen ?? 0)
    } else {
      const newPlayer = MediaPlayer().create()
      setPlayer(newPlayer)
      initializePlayer(newPlayer)
      // newVideoElement.initialize(videoElement.current, videoSource, false, t ?? newVideoInfo?.timeSeen ?? 0)
    }
  }

  function togglePlay () {
    if (!videoElementRef.current) return
    if (videoElementRef.current.paused) {
      videoElementRef.current.play()
    } else {
      videoElementRef.current.pause()
    }
  }

  const handlePlaying = () => setPaused(false)
  const handlePause = () => setPaused(true)

  function updateCurrentTime (event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setCurrentTime(Number(value))
    if (videoElementRef.current) videoElementRef.current.currentTime = Number(value)
  }

  function handleTimeUpdate (event: ChangeEvent<HTMLVideoElement>) {
    const { target } = event
    setCurrentTime(Number(target.currentTime))
    if (sliderRef.current) sliderRef.current.value = target.currentTime.toString()
  }

  function toggleControls () {
    
  }

  return (
    <main ref={videoElementWrapperRef} className='h-fit bg-black flex items-center justify-center relative z-[96]'>
      <div className='relative h-auto w-fit' onClick={toggleControls}>
        <video
          ref={videoElementRef}
          id='videoElement'
          className='h-auto w-auto bg-black'
          onPlaying={handlePlaying}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
        />
        {/* <button id='start' onClick={togglePlay} className='absolute z-10 h-full w-full left-0 top-0'></button> */}
        <div id='posterWrapper' className='absolute left-1/2 top-1/2 [transform:translate(-50%,-50%)] h-full w-full max-h-full max-w-full overflow-hidden pointer-events-none'>
          {/* { videoInfo?.selectedQuality === 'audio_only' && <img src={''} onError={(e) => e.currentTarget.style.display = 'none'} className='h-ful w-full max-w-full max-h-full object-contain' /> } */}
        </div>
      </div>
      { videoInfo && <VideoQualities videoInfo={videoInfo} /> }
      <div ref={controlsRef} id='controls' className='absolute z-20 bottom-0 h-14 w-full bg-[#000c] px-6 py-1'>
        <input
          ref={sliderRef}
          id='slider'
          type='range'
          step={0.1}
          max={videoInfo?.duration}
          min={0}
          className='absolute top-0 left-[50%] [transform:translateX(-50%)] w-[calc(100%-48px)] h-0.5 bg-white accent-red-500'
          defaultValue={videoInfo?.timeSeen}
          onInput={updateCurrentTime}
          onMouseDown={() => videoElementRef.current?.pause()}
          onMouseUp={() => videoElementRef.current?.play()}
        />
        <div className='h-full flex-1'>
          <button id='togglePlay' onClick={togglePlay}>{paused ? 'Paused' : 'Playing'}</button>
          <div>
            <time id='currentTime'>{parseDuration(Math.floor(currentTime ?? videoInfo?.timeSeen ?? 0))}</time>
            /
            <time id='duration'>{parseDuration(duration || videoElementRef.current?.duration || 0)}</time>
          </div>
        </div>
      </div>
    </main>
  )
}
