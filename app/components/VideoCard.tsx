import type { Creator, Video, VideoVisto } from '@/env'
import { parseViews, parsePublicationDate, parseDuration } from '@/lib/utils'
import { IconChannelVerified } from './Icons'
import { Link, useNavigate } from 'react-router'
import { getCreatorById } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useSearchParamsStore } from '@/stores/useSearchParamsStore'
import { useUserStore } from '@/stores/useUserStore'

export default function VideoCard ({ video, className = '' }: { video: Video, className?: string }) {
  const [creator, setCreator] = useState<Creator>()
  const [userVideoInfo, setUserVideoInfo] = useState<VideoVisto>()
  const user = useUserStore(state => state.user)
  const parsedViews = parseViews(video.views)
  const parsedDuration = parseDuration(video.duration)
  const parsedPublicationDate = video.publicationDate && parsePublicationDate(video.publicationDate)

  const navigate = useNavigate()
  const updateVideoId = useSearchParamsStore(state => state.updateVideoId)
  
  useEffect(() => {
    updateCreator()
    updateUserVideoInfo()
  }, [])

  async function updateCreator () {
    const res = await getCreatorById(video.creatorId)
    if (typeof res === 'string') {
      return
    }
    setCreator(res)
  }

  function updateUserVideoInfo () {
    user?.videosVistos.reduce((pre, v) => {
      if (v.videoId === video.id) {
        setUserVideoInfo(v)
      }
      return pre
    }, {})
  }

  return (
    <article className={`${className} cardWrapper relative`}>
      <button role='link' className='videoCard h-fit w-full cursor-pointer items-start flex flex-col' onClick={() => {
        updateVideoId(video.id)
        navigate(`/watch?v=${video.id}`)
      }}>
        <section className='w-full aspect-video bg-black xs:rounded-xl flex items-end justify-center relative overflow-hidden'>
          <div className='h-full w-full bg-neutral-700'>
            { video.id && <img className='h-full w-full object-cover flex pointer-events-none select-none' src={video.posters.hq720} alt={video.title} /> }
          </div>
          <time className='absolute bottom-2 right-2 bg-[#000a] rounded font-semibold text-xs px-1 py-[2px]'>{parsedDuration}</time>
          <div className='w-full h-1 absolute bottom-0 bg-[#666a]' style={{display: userVideoInfo?.timeSeen ? 'block' : 'none'}}>
            <div className='bg-[#DC2626] h-full rounded-full' style={{
              width: userVideoInfo?.timeSeen ? `calc(100%/(${video.duration}/${userVideoInfo.timeSeen}))` : '0px'
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
          <Link to='/channel?id=ooo0eve0ooo' className='absolute top-0 ms:left-0 left-3 size-10 aspect-square flex items-center justify-start mt-3 pointer-events-auto'>
            <div className='ms:size-9 xs:size-10 size-[min(40px,9vw)] aspect-square object-contain max-h-full max-w-full rounded-full overflow-hidden bg-neutral-700'>
              { creator?.id && <img
                  src={creator.avatars.mini} alt={creator.id}
                  onError={(e) => {e.currentTarget.style.display = 'none}'}}
                  className='size-full'
                />
              }
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
