import type { Video } from '@/env'
import VideoCard from '../VideoCard'
import { v4 as uuidv4 } from 'uuid'
import { useNavigation } from 'react-router'

export function HomeNormal ({ videosSugeridos }: { videosSugeridos: Video[] }) {
  const navigation = useNavigation()
  
  return (
    <div className='h-fit max-h-fit w-full max-w-full grid grid-cols-[min(100%,500px)] ms:grid-cols-[repeat(auto-fill,minmax(312px,1fr))] sm:p-6 pt-6 ms:gap-4 justify-center place-items-center items-start'>
      { navigation.state === 'submitting' && <p className='fixed left-1/2 top-1/2 z-[999] bg-black p-16'>asdfasdfasdf</p> }
      {
        videosSugeridos && videosSugeridos.map(video => <VideoCard key={uuidv4()} video={video} className='max-w-videoCard w-full' />)
      }
    </div>
  )
}
