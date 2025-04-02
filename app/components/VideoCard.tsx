import type { Creator, Video } from '@/env'
import { parseViews, parsePublicationDate, parseDuration } from '@/lib/utils'
import { IconChannelVerified } from './Icons'
import { Link, useNavigate } from 'react-router'
import { getCreatorById, serverURL } from '@/lib/api'
import { useEffect, useState, type ChangeEvent } from 'react'
import { creators } from '@/mocks'
import { useSearchParamsStore } from '@/stores/useSearchParamsStore'
import { useSearchParams } from 'react-router'

export default function VideoCard ({ video }: { video: Video }) {
  const [creator, setCreator] = useState<Creator>()
  const parsedViews = parseViews(video.views)
  const parsedDuration = parseDuration(video.duration)
  const parsedPublicationDate = video.publicationDateTime && parsePublicationDate(video.publicationDateTime)

  const searchParams = useSearchParams()
  const navigate = useNavigate()
  const updateVideoId = useSearchParamsStore(state => state.updateVideoId)
  
  useEffect(() => {
    getCreator()
  }, [])

  async function getCreator () {
    // const creator = await getCreatorById(video.creatorId)
    const creator = creators.find(c => c.id === video.creatorId)
    setCreator(creator)
  }
  

  return (
    <article className='cardWrapper relative'>
      <button role='link' className='videoCard h-fit w-full cursor-pointer items-start flex flex-col' onClick={() => {
        updateVideoId(video.id)
        navigate(`/watch?v=${video.id}`)
      }}>
        <section className='w-full aspect-video bg-black xs:rounded-xl flex items-end justify-center relative overflow-hidden'>
          <div className='h-full w-full bg-neutral-700'>
            { video.posters.length > 0 && <img className='h-full w-full object-cover flex pointer-events-none select-none' src={`${serverURL}/poster/${video.id}`} alt={video.title} /> }
          </div>
          <time className='absolute bottom-2 right-2 bg-[#000a] rounded font-semibold text-xs px-1 py-[2px]'>{parsedDuration}</time>
          <div className='w-full h-1 absolute bottom-0 bg-[#666a]' style={{display: video.timeSeen ? 'block' : 'none'}}>
            <div className='bg-[#DC2626] h-full rounded-full' style={{
              width: video.timeSeen ? `calc(100%/(${video.duration}/${video.timeSeen}))` : '0px'
              }} />
          </div>
        </section>
        <section className='w-full h-26 ms:h-29 text-sm relative grid ms:grid-cols-[48px_1fr] grid-cols-[64px_1fr]'>
          <div />
          <div className='flex-1 text-neutral-400 pt-3 flex flex-col items-start'>
            <h1 className='xs:text-base text-[min(3.2vw,16px)] font-medium text-start leading-[22px] line-clamp-2 text-white'>{video.title}</h1>
            <div className='text-[min(3vw,14px)] ms:block flex items-center gap-1'>
              {
                creator?.name && (
                  <div className='flex items-center justify-start w-fit h-fit'>
                    <span className='pr-1.5'>{creator?.name}</span>
                    <span className='ms:hidden flex w-fit'>•</span>
                    <div className='size-[14px] hidden ms:block aspect-square fill-neutral-400'>{creator?.verified ? <IconChannelVerified /> : ''}</div>
                  </div>
                )
              }
              { parsedViews && <span>{parsedViews} vistas </span> }
              { parsedPublicationDate && (
                <>
                  <span>•</span>
                  <span> hace {parsedPublicationDate}</span>
                </>
              )}
            </div>
          </div>
        </section>
      </button>
      <article className='absolute top-0 left-0 h-full w-full flex flex-col pointer-events-none'>
        <section className='w-full aspect-video rounded-xl' />
        <section className='w-full flex min-h-[116px] h-full pt-3 gap-2 flex-1 relative'>
          <Link to='/@ooo0eve0ooo' className='absolute top-0 ms:left-0 left-3 size-10 aspect-square flex items-center justify-start mt-3 pointer-events-auto'>
            <div className='ms:size-9 xs:size-10 size-[min(40px,9vw)] aspect-square object-contain max-h-full max-w-full rounded-full overflow-hidden bg-neutral-700'>
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
