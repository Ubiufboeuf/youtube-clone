import type { Video } from '@/env'

export function VideoInfo ({ video }: { video: Video }) {
  return (
    <div className='h-full w-full'>
      <h1>{video.title}</h1>
      <p>{video.description}</p>
    </div>
  )
}
