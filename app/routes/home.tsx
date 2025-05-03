import { HomeNav } from '@/components/home/HomeNav'
import { useEffect, useState, type FC, type JSX, type ReactNode } from 'react'
import { getAllVideos } from '@/lib/api'
import { useLoaderData } from 'react-router'
import { AsideMenuMini } from '@/components/home/AsideMenuMini'
import { user } from '@/lib/mocks'
import { HomeAnonimous } from '@/components/home/HomeAnonimous'
import { HomeNoVideos } from '@/components/home/HomeNoVideos'
import { HomeNormal } from '@/components/home/HomeNormal'
import type { Video } from '@/env'

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
  // const [videosSugeridos, setVideosSugeridos] = useState<Video[]>([])
  const videosSugeridos = useLoaderData<typeof clientLoader>()
  const [HomeMainContent, setHomeMainContent] = useState<FC<{ videosSugeridos: Video[] }>>()

  useEffect(() => {
    let mainContent
    if (user.type === 'anonimous') {
      mainContent = () => HomeAnonimous
    } else if (videosSugeridos.length === 0) {
      mainContent = () => HomeNoVideos
    } else {
      mainContent = () => HomeNoVideos
    }
    setHomeMainContent(mainContent)
  }, [])

  // async function updateVideosSugeridos () {
  //   getAllVideos({ from: videosSugeridos?.length || 0, to: (videosSugeridos?.length || 0) + 60 })
  //     .catch((error) => console.error(error))
  //     .then(newVideos => {
  //       setVideosSugeridos([...videosSugeridos, ...newVideos || []])
  //     })
  // }

  return (
    <>
      <AsideMenuMini />
      <HomeNav />
      <section id='home' className='absolute top-28 right-0 [transition:width_250ms_ease] flex h-[calc(100%-112px)] w-full ml:w-[var(--nav-width)]'>
        { HomeMainContent && <HomeMainContent videosSugeridos={videosSugeridos} /> }
      </section>
    </>
  )
}
