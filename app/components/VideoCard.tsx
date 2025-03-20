import type { Creator, Video } from '@/env'
import { parseViews, parsePublicationDate, parseDuration } from '@/lib/utils'
import { IconVerified } from './Icons'
import { Link, useNavigate } from 'react-router'
import { getCreatorById, serverURL } from '@/lib/api'
import { useEffect, useState } from 'react'
import { creators } from '@/mocks'
import { useSearchParamsStore } from '@/stores/useSearchParams'
import { useSearchParams } from 'react-router'

export default function VideoCard ({ video }: { video: Video }) {
  const [creator, setCreator] = useState<Creator>()
  const parsedViews = parseViews(video.views)
  const parsedDuration = parseDuration(video.duration)
  const parsedPublicationDate = video.publicationDate && parsePublicationDate(video.publicationDate)

  const searchParams = useSearchParams()
  const navigate = useNavigate()
  const updateVideoId = useSearchParamsStore(state => state.updateVideoId)
  
  useEffect(() => {
    if (!creator) {
      getCreator()
    }
  }, [video.creatorId])

  async function getCreator () {
    // const creator = await getCreatorById(video.creatorId)
    creators.find(c => c.id === video.creatorId)
    setCreator(creator)
  }
  

  return (
    <article className='relative'>
      <button className='videoCard h-fit w-full cursor-pointer flex flex-col' onClick={() => {
        updateVideoId(video.id)
        navigate(`?v=${video.id}`)
      }}>
        <section className='w-full aspect-video bg-black rounded-xl flex items-end justify-center relative overflow-hidden'>
          <div className='h-full w-full bg-neutral-700'>
            { video.posters.length > 0 && <img className='h-full w-full object-cover flex pointer-events-none select-none' src={`${serverURL}/poster/${video.id}`} alt={video.title} /> }
          </div>
          <time className='absolute bottom-2 right-2 bg-[#000a] rounded font-semibold text-xs px-1 py-[2px]'>{parsedDuration}</time>
          <div className='w-full h-1 absolute bottom-0 bg-[#666a]'>
            <div className='bg-[#DC2626] h-full rounded-full' style={{
              width: video.timeSeen ? `calc(100%/(${video.duration}/${video.timeSeen}))` : '0px'
              }} />
          </div>
        </section>
        <section className='w-full h-29 text-sm relative grid grid-cols-[48px_1fr]'>
          <div />
          <div className='flex-1 text-neutral-400 pt-3'>
            <h1 className='text-base font-medium leading-[22px] line-clamp-2 text-white'>{video.title}</h1>
            <span className='flex items-center justify-center w-fit h-fit gap-1 pt-1'>
              {creator?.name}
              <div className='size-[14px] aspect-square fill-neutral-400'>{creator?.verified ? <IconVerified /> : ''}</div>
            </span>
            {
              <span>
                { parsedViews && <span>{parsedViews} vistas</span> }
                { parsedPublicationDate && <span> • hace {parsedPublicationDate}</span> }
              </span>
            }
          </div>
        </section>
      </button>
      <article className='absolute top-0 left-0 h-full w-full flex flex-col pointer-events-none'>
        <section className='w-full aspect-video rounded-xl' />
        <section className='w-full flex min-h-[116px] h-full pt-3 gap-2 flex-1 relative'>
          <Link to='/@ooo0eve0ooo' className='absolute top-0 size-10 aspect-square flex items-center justify-start mt-3 pointer-events-auto'>
            <div className='h-9 w-9 aspect-square object-contain max-h-full max-w-full rounded-full overflow-hidden bg-neutral-700'>
              <img
                src={`${serverURL}/avatar/${creator?.id}`} alt={creator?.id}
                onError={(e) => {e.currentTarget.style.display = 'none}'}}
                className='size-full'
              />
            </div>
          </Link>
          <div className='flex-1 h-fit'>
            <div className='w-[90%] h-4 rounded mb-3' />
            <div className='w-[60%] h-4 rounded' />
          </div>
        </section>
      </article>
      
    </article>
  )
}
