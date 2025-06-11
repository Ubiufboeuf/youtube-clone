import type { Video } from '@/env'
import { v4 as uuidv4 } from 'uuid'
import VideoCardListed from '../VideoCardListed'

export function AsideRight ({ cinemaModeActive, videos }: { cinemaModeActive?: boolean, videos: Video[] }) {
  return (
    <aside
      className={`${cinemaModeActive ? '[grid-row:2]': '[grid-row:1/-1]'} [grid-column:2] h-[min(100%,1500px)] max-h-full w-full flex flex-col items-center justify-start rounded-xl min-h-fit`}
      style={{ gridArea: 'aside' }}
    >
      {
        videos.map(video => {
          return <VideoCardListed key={uuidv4()} video={video} className='max-w-videoCard' />
        })
      }
    </aside>
  )
}
