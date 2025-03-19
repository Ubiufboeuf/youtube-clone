import { title } from '@/lib/utils'
import type { Route } from './+types/home'
import { HomeNav } from '@/components/home/HomeNav'
import { HomeAsideMenu } from '@/components/home/HomeAsideMenu'
import { AsideMenuMini } from '@/components/home/AsideMenuMini'
import MediaCardFallback from '@/components/MediaCardFallback'
import MediaCard from '@/components/MediaCard'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import type { Media } from '@/env'
import { getAllMedias } from '@/lib/api'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: title() }
  ]
}

export default function home () {
  const [mediasSugeridos, setMediasSugeridos] = useState<Media[]>()
  const asideInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    asyncSetMediasSugeridos()
    const opened = window.localStorage.getItem('asideDefaultOpened')
    if (asideInputRef.current) asideInputRef.current.checked = opened === 'true'
  }, [])

  async function asyncSetMediasSugeridos () {
    getAllMedias()
      // .then(res => res.json())
      .then(data => {
        // setMediasSugeridos(data)
        setMediasSugeridos(data)
      })
      .catch(() => {
        console.error('Error consiguiendo los medias')
      })
  }

  function handleAsideInput (event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target
    window.localStorage.setItem('asideDefaultOpened', checked.toString())
    console.log({checked})
  }

  return (
    <>
      <input
        id='checkbox-home-aside-menu'
        type='checkbox'
        className='
          [&:checked+#homeAsideMenu]:left-[0px] [&:not(:checked)+#homeAsideMenu]:-left-[240px]
          [&:not(:checked)~#homeNav]:w-[calc(100%-72px)] [&:not(:checked)~#homeMedias]:w-[calc(100%-72px)]
        '
        hidden
        ref={asideInputRef}
        onInput={handleAsideInput}
      />
      <aside id='homeAsideMenu' className='fixed top-14 left-[var(--left)] [--left:_0px] w-60 h-[calc(100dvh-56px)] z-[2] bg-primary-dark '>
        <HomeAsideMenu />
      </aside>
      <AsideMenuMini />
      <HomeNav />
      <section id='homeMedias' className='absolute top-28 right-0 flex h-full w-[var(--nav-width)]'>
        <div className='min-h-full h-fit w-full max-w-full grid grid-cols-[repeat(auto-fill,minmax(312px,1fr))] p-6 gap-4 justify-center items-start'>
          {
            mediasSugeridos && mediasSugeridos.map(media => {
              return (
                <MediaCard key={crypto.randomUUID()} media={media} />
              )
            })
          }
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
          <MediaCardFallback />
        </div>
      </section>
    </>
  )
}
