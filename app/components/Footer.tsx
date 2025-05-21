import { v4 as uuidv4 } from 'uuid'
import { IconHome, IconLibrary, IconSearch, IconShorts, IconSubscriptions } from './Icons'
import { Link, useLocation } from 'react-router'
import { useEffect, useState } from 'react'

const items = [
  { id: 'home', path: '/', name: 'Inicio', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
  { id: 'shorts', path: '/shorts', name: 'Shorts', Icon: ({ active = false }: { active?: boolean }) => <IconShorts active={active} /> },
  { id: 'search', path: '/search', name: 'Buscar', Icon: ({ active = false }: { active?: boolean }) => <IconSearch active={active} /> },
  { id: 'subscriptions', path: '/you/subscriptions', name: 'Subs', Icon: ({ active = false }: { active?: boolean }) => <IconSubscriptions active={active} /> },
  { id: 'library', path: '/you/library', name: 'Librería', Icon: ({ active = false }: { active?: boolean }) => <IconLibrary active={active} /> }
]

export function Footer () {
  const location = useLocation()
  const [path, setPath] = useState<string>('')

  useEffect(() => {
    if (!location) return
    setPath(location.pathname)
  }, [location])

  return (
    <footer className='fixed mobile:flex hidden bottom-0 right-0 w-full h-16 bg-footer justify-evenly items-center'>
      {
        items.map((el) => {
          const { Icon, name } = el
          return (
            <Link key={uuidv4()} to={el.path} className={`${path === el.path ? 'currentPath [&>div]:bg-selected' : ''} flex flex-col items-center justify-center h-14 aspect-square gap-1`}>
              <div className='h-1/2 w-full flex items-center justify-center rounded-full overflow-hidden'>
                <div className='size-6 aspect-square rounded-full'>
                  <Icon active={path === el.path} />
                </div>
              </div>
              <span className='text-xs'>
                {name}
              </span>
            </Link>
          )
        })
      }
    </footer>
  ) 
}
