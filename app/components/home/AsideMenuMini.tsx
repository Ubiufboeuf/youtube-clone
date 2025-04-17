/* eslint-disable react/prop-types */
import { Link } from 'react-router'
import { IconCollections, IconExplore, IconHistory, IconHome, IconLikedVideos, IconPlaylists, IconQuestionMark, IconShorts, IconSubscriptions, IconTV, IconWatchLater } from '../Icons'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { useLocationStore } from '@/stores/useLocationStore'
import type { ItemAside } from '@/env'

const itemsAside: ItemAside[][] = [
  [
    { name: 'Principal', path: '/', Icon: ({ active = false }) => <IconHome active={active} /> },
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
  const location = useLocationStore((state) => state.location)

  useEffect(() => {
    if (!location) return
    setPathname(location.pathname)
  }, [location])

  return (
    <aside
      id='aside-menu-mini'
      className='w-18 px-2 hidden ml:flex flex-col items-center py-3 fixed left-0 bg-primary-dark z-[98]'
    >
      {
        itemsAside.map((el) => el.map(({ name, Icon, path }) => {
          return (
            <Link
              key={uuidv4()}
              to={path}
              className={`${path === pathname ? 'actualPathMini bg-bg-selected font-medium' : 'hover:bg-neutral-800'}
                h-10 aspect-square flex flex-col rounded-lg items-center justify-center
              `}
              title={name}
            >
              <div className='h-6 aspect-square'>
                <Icon active={path === pathname} />
              </div>
            </Link>
          )
        }))
      }
    </aside>
  )
}
