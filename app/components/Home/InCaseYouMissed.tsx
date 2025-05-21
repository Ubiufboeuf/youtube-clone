import type { Video } from '@/env'
import { v4 as uuidv4 } from 'uuid'
import VideoCardSlim from '../VideoCardSlim'
import { useEffect, useRef, type UIEvent } from 'react'
import { IconArrowDown, IconClose } from '../Icons'

export function InCaseYouMissed ({ videos }: { videos: Video[] }) {
  const sliderWrapper = useRef<HTMLDivElement>(null)
  const arrowLeft = useRef<HTMLButtonElement>(null)
  const arrowRight = useRef<HTMLButtonElement>(null)
  const cardWidth = useRef<number>(0)
  const thisComponent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sliderWrapper.current) return
    cardWidth.current = sliderWrapper.current.children[0].children[0]?.clientWidth // el ?. es porque si no hay videos no hay elementos
    manageScroll(sliderWrapper.current)
  }, [])

  function handleScroll (event: UIEvent<HTMLDivElement>) {
    manageScroll(event.currentTarget)
  }

  function manageScroll (el: HTMLDivElement) {
    if (!sliderWrapper.current) return

    const scrollLeft = el.scrollLeft
    const scrollWidth = el.scrollWidth
    const containerWidth = el.children[0]?.clientWidth // el ?. es porque si no hay videos no hay elementos
    const maxScroll = scrollWidth - containerWidth

    let p1 = 10
    let p2 = 90

    if (scrollLeft === 0) { p1 = 0; p2 = 90 }
    else if (scrollLeft <= maxScroll * 0.1) { p1 = Math.min(10, scrollLeft * 100 / maxScroll) }
    else if (scrollLeft >= maxScroll * 0.9) { p2 = Math.max(90, scrollLeft * 100 / maxScroll) }
    else if (scrollLeft === maxScroll) { p1 = 10; p2 = 100 }

    const arrowLeftHidden = scrollLeft === 0
    const arrowRightHidden = scrollLeft === maxScroll

    sliderWrapper.current.setAttribute('style', `--p1:${p1}%; --p2:${p2}%`)
    arrowLeft.current?.setAttribute('style', `display:${arrowLeftHidden ? 'none' : 'flex'}`)
    arrowRight.current?.setAttribute('style', `display:${arrowRightHidden ? 'none' : 'flex'}`)
  }

  function slideLeft () {
    if (!sliderWrapper.current) return
    sliderWrapper.current.scrollBy({
      left: -(cardWidth.current + 16),
      behavior: 'smooth'
    })
  }

  function slideRight () {
    if (!sliderWrapper.current) return
    sliderWrapper.current.scrollBy({
      left: (cardWidth.current + 16),
      behavior: 'smooth'
    })
  }

  function closeThisComponent () {
    thisComponent.current?.remove()
  }

  return (
    <section ref={thisComponent} className='min-h-fit w-full flex min-w-full max-w-120 sm:px-6 xs:pt-6 overflow-hidden'>
      <div className='relative bg-[#202224] w-full h-fit min-h-fit max-h-full overflow-hidden sm:rounded-xl p-6 pb-0 gap-4 flex flex-col'>
        <h1 className='text-lg font-medium'>Por Si Te Lo Perdiste</h1>
        <button className='absolute cursor-pointer hover:bg-neutral-700 transition-colors top-4 right-6 size-10 overflow-hidden rounded-full aspect-square flex items-center justify-center z-10' onClick={closeThisComponent}>
          <div className='size-6 aspect-square fill-neutral-400'>
            <IconClose />
          </div>
        </button>
        <button
          ref={arrowLeft}
          className='absolute cursor-pointer size-10 left-5 top-1/2 [transform:translateY(-50%)] rounded-full aspect-square flex items-center justify-center z-10 bg-[#3f3f3f]'
          onClick={slideLeft}
        >
          <div className='size-7 aspect-square fill-neutral-400 rotate-90'>
            <IconArrowDown />
          </div>
        </button>
        <button
          ref={arrowRight}
          className='absolute cursor-pointer size-10 right-5 top-1/2 [transform:translateY(-50%)] rounded-full aspect-square flex items-center justify-center z-10 bg-[#3f3f3f]'
          onClick={slideRight}
        >
          <div className='size-7 aspect-square fill-neutral-400 -rotate-90'>
            <IconArrowDown />
          </div>
        </button>
        <div
          ref={sliderWrapper}
          className='h-fit w-full max-w-full flex justify-center items-center [mask-image:linear-gradient(to_right,transparent,black_var(--p1),black_var(--p2),transparent)] overflow-x-auto [scrollbar-width:none] [&]:[--end:transparent;p1:10%;p2:90%]'
          onScroll={handleScroll}
        >
          <div className='h-fit w-full flex flex-nowrap gap-4'>
            {
              videos && videos.map(video => <VideoCardSlim key={uuidv4()} video={video} className='max-h-70 min-w-78 aspect-[356/316.25] w-auto overflow-hidden' />)
            }
          </div>
        </div>
      </div>
    </section>
  ) 
}
