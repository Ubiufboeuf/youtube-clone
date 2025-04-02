/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router'
import { IconCollections, IconExplore, IconHistory, IconHome, IconLikedVideos, IconPlaylists, IconShorts, IconSubscriptions, IconTV, IconWatchLater } from '../Icons'
import { MenuLink } from '../AsideNavigation/MenuLink'
import { useEffect, useRef, useState } from 'react'
import { MenuExpandableLink } from '../AsideNavigation/MenuExpandableLink'
import type { ItemAside } from '@/env'
import { useLocationStore } from '@/stores/useLocationStore'

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
  ]
]

export function AsideMenu () {
  const [path, setPath] = useState<string>('')
  const location = useLocationStore((state) => state.location)
  const asideMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!location) return
    setPath(location.pathname)
  }, [location])

  return (
    <>
      <aside id='asideMenu' ref={asideMenuRef} className='fixed top-14 left-[var(--left)] [transition:left_250ms_ease] [--left:0px] z-[100] w-60 h-[calc(100dvh-56px)] bg-primary-dark'>
        <div className='h-full w-full max-h-full flex flex-col items-center [scrollbar-gutter:stable] px-3 pr-1 gap-2 overflow-y-auto [scrollbar-width:thin]'>
          {
            itemsAside.map(item => {
              return (
                <section key={uuidv4()} className='w-full h-fit text-sm flex flex-col border-b-[1px] border-[#3f3f3f] py-3 [&:checked+#asideMenu]:[--left:0px]'>
                  {
                    item.map((el) => {
                      const { Icon, name } = el
                      if (el.type === 'expand') {
                        return (
                          <MenuExpandableLink
                            key={uuidv4()}
                            item={el}
                            path={path}
                            asideMenuRef={asideMenuRef}
                          />
                        )
                      }
                      return (
                        <MenuLink key={uuidv4()} name={name} link={el.path} path={path}>
                          <Icon active={el.path === path} />
                        </MenuLink>
                      )
                    })
                  }
                </section>
              )
            })
          }
          <section>
            <Link to='/about_this_project' className='cursor-pointer text-neutral-300 hover:text-blue-500 transition-colors'>Acerca de este proyecto</Link>
          </section>
        </div>
      </aside>
      <label id='closeAsideMenu' role='button' className='fixed h-full w-full top-0 bg-[#0006] z-[101]' htmlFor='checkbox-home-aside-menu' hidden />
    </>
  )
}
