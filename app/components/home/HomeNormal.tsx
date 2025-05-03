import type { Video } from '@/env'
import VideoCard from '../VideoCard'
import { v4 as uuidv4 } from 'uuid'

export function HomeNormal ({ videosSugeridos }: { videosSugeridos: Video[] }) {
  return (
    <div className='min-h-full h-fit w-full max-w-full grid grid-cols-[min(100%,500px)] ms:grid-cols-[repeat(auto-fill,minmax(312px,1fr))] sm:p-6 ms:gap-4 justify-center items-start'>
      {
        videosSugeridos && videosSugeridos.map(video => <VideoCard key={uuidv4()} video={video} />)
      }
    </div>
  )
}
