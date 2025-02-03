import { useEffect, useRef } from 'react'

export function Video ({ params }) {
  const videoRef = useRef()

  useEffect(() => {
    const { v, o = 'false' } = params
    console.log(v, o)
    import('dashjs').then(dashjs => {
      const player = document.querySelector('#player')
      if (o === 'true') {
        const url = `/src/server/originals/${v}.webm`
        player.src = url
      } else {
        const url = `/src/server/dashes/${v}/output.mpd`
        const mediaElement = dashjs.MediaPlayer().create()
        console.log(player, url, mediaElement)
        mediaElement.initialize(player, url, true)
      }
    })
  })

  return (
    <section className='w-full h-[78dvh] bg-black'>
      <video
        id='player'
        ref={videoRef}
        className='h-full w-full object-contain bg-transparent focus:outline-0'
        controls
      />
    </section>
  )
}
