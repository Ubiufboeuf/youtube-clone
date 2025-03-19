import type { Creator, Media } from '@/env'
import { parseViews, parsePublicationDate, parseDuration } from '@/lib/utils'
import { IconVerified } from './Icons'
import { Link } from 'react-router'
import { getCreatorById } from '@/lib/api'
import { useEffect, useState } from 'react'

export default function MediaCard ({ media }: { media: Media }) {
  const [creator, setCreator] = useState<Creator>()
  const parsedViews = parseViews(media.views)
  const parsedDuration = parseDuration(media.duration)
  const parsedPublicationDate = media.publicationDate && parsePublicationDate(media.publicationDate)
  
  useEffect(() => {
    getCreator()
  }, [])

  async function getCreator () {
    const creator = await getCreatorById(media.creatorId)
    setCreator(creator)
  }
  

  return (
    <article className='relative'>
      <Link to={`/watch?v=${media.id}`} className='mediaCard h-fit w-full cursor-pointer flex flex-col'>
        <section className='w-full aspect-video bg-black rounded-xl flex items-end justify-center relative overflow-hidden'>
          <div className='h-full w-full bg-neutral-700'>
            { media.poster && <img className='h-full w-full object-cover flex pointer-events-none select-none' src={media.poster} alt={media.title} /> }
          </div>
          <time className='absolute bottom-2 right-2 bg-[#000a] rounded font-semibold text-xs px-1 py-[2px]'>{parsedDuration}</time>
          <div className='w-full h-1 absolute bottom-0 bg-[#666a]'>
            <div className='bg-[#DC2626] h-full rounded-full' style={{
              width: media.timeSeen ? `calc(100%/(${media.duration}/${media.timeSeen}))` : '0px'
              }} />
          </div>
        </section>
        <section className='w-full h-29 text-sm relative grid grid-cols-[48px_1fr]'>
          <div />
          <div className='flex-1 text-neutral-400 pt-3'>
            <h1 className='text-base font-medium leading-[22px] line-clamp-2 text-white'>{media.title}</h1>
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
      </Link>
      <article className='absolute top-0 left-0 h-full w-full flex flex-col pointer-events-none'>
        <section className='w-full aspect-video rounded-xl' />
        <section className='w-full flex min-h-[116px] h-full pt-3 gap-2 flex-1 relative'>
          <Link to='/@ooo0eve0ooo' className='absolute top-0 size-10 aspect-square flex items-center justify-start mt-3 pointer-events-auto'>
            <div className='h-9 w-9 aspect-square object-contain max-h-full max-w-full rounded-full overflow-hidden'>
              { creator?.avatar_icon && <img className='size-full' src={creator?.avatar_icon} alt={creator?.id} /> }
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
