/* eslint-disable react/prop-types */
import { Link } from 'react-router'
import { IconCollections, IconExplore, IconHistory, IconHome, IconLikedVideos, IconPlaylists, IconQuestionMark, IconShorts, IconSubscriptions, IconTV, IconWatchLater } from '../Icons'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import type { ItemAside } from '@/env'
import { useLocation } from 'react-router'

const itemsAside: ItemAside[][] = [
  [
    { name: 'Inicio', path: '/', Icon: ({ active = false }) => <IconHome active={active} /> },
    { name: 'Explorar', path: '/explore', Icon: ({ active = false }) => <IconExplore active={active} /> },
    { name: 'Shorts', path: '/shorts', Icon: ({ active = false }) => <IconShorts active={active} /> },
    { name: 'Modo TV', path: '/tv', Icon: ({ active = false }) => <IconTV active={active} /> }
  ],
  [
    { name: 'Historial', path: '/you/history', Icon: ({ active = false }) => <IconHistory active={active} /> },
    { name: 'Ver luego', path: '/you/watch_later', Icon: ({ active = false }) => <IconWatchLater active={active} /> },
    { name: 'Gustados', path: '/you/liked_videos', Icon: ({ active = false }) => <IconLikedVideos active={active} /> },
    { name: 'Playlists', path: '/you/playlists', type: 'expand', Icon: ({ active = false }) => <IconPlaylists active={active} /> }
  ],
  [
    { name: 'Colecciones', path: '/you/collections', type: 'expand', Icon: ({ active = false }) => <IconCollections active={active} /> },
    { name: 'Suscripciones', path: '/you/subscriptions', type: 'expand', Icon: ({ active = false }) => <IconSubscriptions active={active} /> }
  ],
  [
    { name: 'Acerca de este proyecto', path: '/about_this_project', Icon: ({ active = false }) => <IconQuestionMark active={active} /> }
  ]
]

export function AsideMenuMini () {
  const [pathname, setPathname] = useState<string>('')
  const location = useLocation()

  useEffect(() => {
    if (!location) return
    setPathname(location.pathname)
  }, [location])

  return (
    <aside
      id='aside-menu-mini'
      className='w-18 px-2 gap-2 h-[calc(100%-56px)] hidden not-mobile:sm:flex flex-col items-center fixed left-0 bg-primary-dark z-[98] overflow-y-auto [scrollbar-width:none]'
    >
      <div className='min-h-fit w-fit h-full pb-1'>
        {
          itemsAside.map(item => (
            <section key={uuidv4()} className='border-b-[1px] border-[#3f3f3f] py-3'>
              {
                item.map(({ name, Icon, path }) => (
                  <Link
                    key={uuidv4()}
                    to={path}
                    className={`${path === pathname ? 'actualPathMini bg-selected font-medium' : ''}
                      h-10 aspect-square flex flex-col rounded-lg items-center justify-center hover:not-[.actualPathMini]:bg-neutral-800 transition-colors
                    `}
                    title={name}
                  >
                    <div className='h-6 aspect-square'>
                      <Icon active={path === pathname} />
                    </div>
                  </Link>
                ))
              }
            </section>
          ))
        }
      </div>
    </aside>
  )
}
