/* eslint-disable react/prop-types */
import { Link } from 'react-router'
import { IconExplore, IconHome, IconLibrary, IconSearch, IconShorts, IconSubscriptions } from '../Icons'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const items = [
  { id: 'home', path: '/', name: 'Inicio', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
  { id: 'search', path: '/search', name: 'Buscar', Icon: ({ active = false }: { active?: boolean }) => <IconSearch active={active} /> },
  { id: 'shorts', path: '/shorts', name: 'Shorts', Icon: ({ active = false }: { active?: boolean }) => <IconShorts active={active} /> },
  { id: 'explore', path: '/explore', name: 'Explorar', Icon: ({ active = false }: { active?: boolean }) => <IconExplore active={active} /> },
  { id: 'subscriptions', path: '/you/subscriptions', name: 'Subs', Icon: ({ active = false }: { active?: boolean }) => <IconSubscriptions active={active} /> },
  { id: 'library', path: '/you/library', name: 'Librería', Icon: ({ active = false }: { active?: boolean }) => <IconLibrary active={active} /> }
]

export function AsideMenuTablet () {
  const [pathname, setPathname] = useState<string>('')
  const location = useLocation()

  useEffect(() => {
    if (!location) return
    setPathname(location.pathname)
  }, [location])

  return (
    <aside
      id='aside-menu-tablet'
      className='w-18 px-2 gap-6 tablet:sm:not-xl:flex xl:hidden h-[calc(100%-56px)] hidden py-3 flex-col items-center fixed left-0 bg-primary-dark z-[98] overflow-y-auto [scrollbar-width:none]'
    >
      {
        items.map(({ name, Icon, path }) => (
          <Link
            key={uuidv4()}
            to={path}
            className={`${pathname === path ? 'currentPath [&>div]:bg-selected' : 'text-unselected'} flex flex-col items-center justify-center h-14 aspect-square gap-1 group xl:hidden`}
          >
            <div className='h-1/2 w-full flex items-center justify-center rounded-full overflow-hidden group-hover:bg-selected transition-colors flex-1 max-h-8'>
              <div className='size-6 aspect-square rounded-full'>
                <Icon active={pathname === path} />
              </div>
            </div>
            <span className='text-xs'>
              {name}
            </span>
          </Link>
        ))
      }
    </aside>
  )
}
