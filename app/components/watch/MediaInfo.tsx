import type { Media } from '@/env'

export function MediaInfo ({ media }: { media: Media }) {
  return (
    <div className='h-full w-full'>
      <h1>{media.title}</h1>
      <p>{media.description}</p>
    </div>
  )
}
