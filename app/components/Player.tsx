import { getVideoById } from '@/lib/api'
import { parseDuration } from '@/lib/utils'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { VideoQualities } from './VideoQualities'
import type { Video, VideoVisto } from '@/env'
import { useVideoInfoStore } from '@/stores/useVideoInfoStore'
import { useSearchParamsStore } from '@/stores/useSearchParamsStore'
import { useUserStore } from '@/stores/useUserStore'

export function Player ({ videoInfo }: { videoInfo: Video | undefined }) {
  const videoElementRef = useRef<HTMLVideoElement>(null)
  const videoElementWrapperRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLInputElement>(null)

  const setVideoInfo = useVideoInfoStore((state) => state.updateVideoInfo)
  const currentTime = usePlayerStore((state) => state.currentTime)
  const duration = usePlayerStore((state) => state.duration)
  const paused = usePlayerStore((state) => state.paused)
  const setCurrentTime = usePlayerStore((state) => state.updateCurrentTime)
  const setDuration = usePlayerStore((state) => state.updateDuration)
  const setPaused = usePlayerStore((state) => state.updatePaused)
  const videoId = useSearchParamsStore((state) => state.videoId)
  const updateVideoId = useSearchParamsStore((state) => state.updateVideoId)
  const user = useUserStore(state => state.user)

  const [player, setPlayer] = useState<dashjs.MediaPlayerClass>()
  const [url, setURL] = useState<URL>()
  const [userVideoInfo, setUserVideoInfo] = useState<VideoVisto>()

  useEffect(() => {
    const url = new URL(window.location.href)
    setURL(url)
    const videoId = url.searchParams.get('v')
    if (!videoId) return
    updateVideoId(videoId)
    updateUserVideoInfo()
  }, [])

  useEffect(() => {
    if (!videoId) return
    updateVideoInfo()
  }, [videoId])

  useEffect(() => {
    initializePlayer({ player: dashjs.MediaPlayer().create(), t: userVideoInfo?.timeSeen ?? 0 })
  }, [videoInfo])

  function initializePlayer ({ player: _player, t = 0 }: { player?: dashjs.MediaPlayerClass, t?: string | number }) {
    let p

    if (_player) p = _player
    else if (player) p = player
    else p = dashjs.MediaPlayer().create()
    
    if (p && p !== player) setPlayer(p)
    if (p && videoElementRef.current) {
      console.log(p, videoElementRef.current, videoInfo?.source, t)
      p.initialize(videoElementRef.current, videoInfo?.source, false, t ?? userVideoInfo?.timeSeen ?? 0)
      return
    }
  }

  function updateUserVideoInfo() {
    user?.videosVistos.reduce((_, v) => {
      if (v.videoId === videoInfo?.id) {
        setUserVideoInfo(v)
      }
      return v
    }, {})
  }

  async function updateVideoInfo () {
    const t = url?.searchParams.get('t')
    const newVideoInfo = await getVideoById(videoId)
    console.log(newVideoInfo)
    if (!newVideoInfo) return

    // setCurrentTime(userVideoInfo?.timeSeen ?? 0) // esto debería ir en base a un effect del $player.currenTime
    // setPaused(true) // esto debería ir en base a un effect del $player.paused
    setVideoInfo(newVideoInfo)
    setDuration(newVideoInfo.duration)
    initializePlayer({ t: t ?? 0 })
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
    <main ref={videoElementWrapperRef} className='max-h-[min(74vh,700px)] aspect-video w-full overflow-hidden bg-black flex items-center justify-center relative z-[96]'>
      <video
        ref={videoElementRef}
        id='videoElement'
        className='h-full max-h-[inherit] w-full object-contain bg-black'
        onPlaying={handlePlaying}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className='relative h-full' onClick={toggleControls}>
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
          defaultValue={userVideoInfo?.timeSeen ?? 0}
          onInput={updateCurrentTime}
          onMouseDown={() => videoElementRef.current?.pause()}
          onMouseUp={() => videoElementRef.current?.play()}
        />
        <div className='h-full flex-1'>
          <button id='togglePlay' onClick={togglePlay}>{paused ? 'Paused' : 'Playing'}</button>
          <div>
            <time id='currentTime'>{parseDuration(Math.floor(currentTime ?? userVideoInfo?.timeSeen ?? 0))}</time>
            /
            <time id='duration'>{parseDuration(duration || videoElementRef.current?.duration || 0)}</time>
          </div>
        </div>
      </div>
    </main>
  )
}
