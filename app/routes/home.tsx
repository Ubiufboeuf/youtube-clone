import { HomeNav } from '@/components/Home/HomeNav'
import { useEffect, useState, type FC } from 'react'
import { getAllVideos } from '@/lib/api'
import { useLoaderData } from 'react-router'
import { AsideMenuMini } from '@/components/Home/AsideMenuMini'
import { AsideMenuTablet } from '@/components/Home/AsideMenuTablet'
import { user } from '@/lib/mocks'
import { HomeAnonimous } from '@/components/Home/HomeAnonimous'
import { HomeNoVideos } from '@/components/Home/HomeNoVideos'
import { HomeNormal } from '@/components/Home/HomeNormal'
import type { Video } from '@/env'
import { InCaseYouMissed } from '@/components/Home/InCaseYouMissed'

export async function clientLoader() {
  try {
    const videos = await getAllVideos({ to: 40 })
    return videos
  } catch (err) {
    console.log(err)
    return []
  }
}

export default function Home () {
  const videosSugeridos = useLoaderData<typeof clientLoader>()
  const [HomeMainContent, setHomeMainContent] = useState<FC<{ videosSugeridos: Video[] }>>()

  useEffect(() => {
    let mainContent
    if (user.type === 'anonimous') {
      mainContent = () => HomeAnonimous // invitado / incognito
    } else if (videosSugeridos.length === 0) {
      mainContent = () => HomeNoVideos // no video
    } else {
      mainContent = () => HomeNormal // videos
    }
    setHomeMainContent(mainContent)
  }, [])

  return (
    <>
      <AsideMenuMini />
      <AsideMenuTablet />
      <HomeNav />
      <section id='home' className='absolute top-28 right-0 [transition:width_250ms_ease] flex flex-col h-[calc(100%-112px)] w-full ml:w-[var(--nav-width)]'>
        { videosSugeridos?.length ? <InCaseYouMissed videos={videosSugeridos} /> : null }
        { HomeMainContent && <HomeMainContent videosSugeridos={videosSugeridos} /> }
      </section>
    </>
  )
}
