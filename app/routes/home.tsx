import { HomeNav } from '@/components/home/HomeNav'
import VideoCardFallback from '@/components/VideoCardFallback'
import VideoCard from '@/components/VideoCard'
import { useEffect } from 'react'
import { getAllVideos } from '@/lib/api'
import { v4 as uuidv4 } from 'uuid'
// import { useVideosListStore } from '@/stores/useVideosListStore'
import { Link, useLoaderData } from 'react-router'
import { AsideMenuMini } from '@/components/home/AsideMenuMini'

export async function clientLoader() {
  const videos = await getAllVideos({ to: 40 })
  return videos
}

export default function Home () {
  // const [videosSugeridos, setVideosSugeridos] = useState<Video[]>([])
  const videosSugeridos = useLoaderData<typeof clientLoader>()

  useEffect(() => {
    updateVideosSugeridos()
  }, [])

  async function updateVideosSugeridos () {
    // getAllVideos({ from: videosSugeridos?.length || 0, to: (videosSugeridos?.length || 0) + 60 })
    //   .catch((error) => console.error(error))
    //   .then(newVideos => {
    //     // setVideosSugeridos([...videosSugeridos, ...newVideos || []])
    //   })
  }

  return (
    <>
      <AsideMenuMini />
      <HomeNav />
      <section id='home' className='absolute top-28 right-0 [transition:width_250ms_ease] flex h-[calc(100%-112px)] w-full ml:w-[var(--nav-width)]'>
        { videosSugeridos?.length === 0 ? (
            <div className='fixed left-1/2 top-1/2 [transform:translate(-50%,-50%)] h-fit gap-8 w-124 p-6 bg-neutral-800 border-[1px] border-neutral-600 rounded-xl flex flex-col items-center justify-between'>
              <h1 className='text-2xl font-bold text-center'>¡Bienvenido a YouTube!</h1>
              <p className='-mt-2 text-center'>Acá podrás encontrar
                <strong> videos </strong>y<strong> shorts </strong>
                de todo tipo, y si no sabes qué buscar, el&nbsp;
                <Link to='/tv' className='relative w-fit h-fit group inline-flex'>
                  <span className='opacity-0'>modo TV</span>
                  <strong className='absolute z-[1] left-1/2 top-1/2 [transform:translate(-50%,-50%)] text-nowrap [background-image:var(--color-pink-gradient)] [background-clip:text] text-transparent'>modo TV</strong>
                  <strong className='absolute z-[2] left-1/2 top-1/2 [transform:translate(-50%,-50%)] text-nowrap [background-image:var(--color-gradient)] [background-clip:text] text-transparent transition-opacity opacity-0 group-hover:opacity-100'>modo TV</strong>
                </Link>
                &nbsp;será lo mejor para tí.
              </p>
              <span className='text-neutral-400 text-wrap text-xs text-center'>Necesitas consumir contenido para poder recomendarte cosas, <br />
                <strong>¡animate a hacer tu primera búsqueda!</strong>
              </span>
            </div>
          ) : (
            <div className='min-h-full h-fit w-full max-w-full grid grid-cols-[min(100%,500px)] ms:grid-cols-[repeat(auto-fill,minmax(312px,1fr))] sm:p-6 ms:gap-4 justify-center items-start'>
              {
                videosSugeridos.map(video => {
                  return (
                    <VideoCard key={uuidv4()} video={video} />
                  )
                })
              }
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
              <VideoCardFallback />
            </div>   
          )
        }
      </section>
    </>
  )
}
