/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid'
import { Link, useLocation } from 'react-router'
import { IconCollections, IconExplore, IconHistory, IconHome, IconLikedVideos, IconPlaylists, IconShorts, IconSubscriptions, IconTV, IconWatchLater } from '@/components/Icons'
import { MenuLink } from '@/components/AsideNavigation/MenuLink'
import { useEffect, useRef, useState } from 'react'
import { MenuExpandableLink } from '@/components/AsideNavigation/MenuExpandableLink'
import type { ItemAside } from '@/env'
import { useAsideMenuStore } from '@/stores/useAsideMenuStore'

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
  ]
]

export function AsideMenu () {
  const [path, setPath] = useState<string>('')
  const location = useLocation()
  const asideMenuRef = useRef<HTMLDivElement>(null)
  const isAsideOpened = useAsideMenuStore(state => state.isOpen)
  const setIsAsideOpened = useAsideMenuStore(state => state.setIsOpen)

  useEffect(() => {
    if (!location) return
    setPath(location.pathname)
  }, [location])

  function toggleAsideMenu () {
    setIsAsideOpened(!isAsideOpened)
  }

  return (
    <>
      <aside id='asideMenu' ref={asideMenuRef} className='fixed top-14 [transition:left_250ms_ease] z-[100] w-60 h-[calc(100dvh-56px)] bg-primary-dark asideOpened:left-0 -left-60'>
        <div className='h-full w-full max-h-full flex flex-col items-center [scrollbar-gutter:stable] px-3 pr-1 pb-2 gap-2 overflow-y-auto [scrollbar-width:thin]'>
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
      <button
        className='ml:hidden fixed h-screen w-full flex top-0 asideOpened:bg-[#0006] bg-transparent asideOpened:left-0 -left-full [transition:background_250ms_ease] z-[99]'
        onClick={toggleAsideMenu}
      />
      <div
        id='hideAsideMenuHidden'
        className='w-aside max-w-aside fixed h-full -left-aside z-[101] bg-primary-dark'
      />
    </>
  )
}
