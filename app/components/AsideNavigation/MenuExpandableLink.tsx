import type { ItemAside } from '@/env'
import { useEffect, useState, type ChangeEvent, type RefObject } from 'react'
import { Link } from 'react-router'
import type { JSX } from 'react/jsx-runtime'
import { v4 as uuidv4 } from 'uuid'
import { IconArrowDown, IconHome } from '../Icons'

type SubItem = {
  Icon?: ({ active }: { active?: boolean }) => JSX.Element
  name: string
  link: string
}

export function MenuExpandableLink ({ item: { Icon, name, path }, path: pathname, asideMenuRef }: { item: ItemAside, path: string, asideMenuRef: RefObject<HTMLDivElement | null> }) {
  const [subItems, setSubItems] = useState<SubItem[]>()

  useEffect(() => {
    getSubItems(name)
  }, [])

  function getSubItems(name: string) {
    setSubItems([
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> },
      { name, link: '#', Icon: ({ active = false }: { active?: boolean }) => <IconHome active={active} /> }
    ])
  }

  function handleInput (event: ChangeEvent<HTMLInputElement>) {
    const { target } = event
    const savedCheck = target.checked
    if (asideMenuRef.current) {
      const links = asideMenuRef.current.querySelectorAll('.expandableLink')
      links.forEach(link => {
        const checkbox = link.querySelector('input[name=checkbox-aside-items]')
        if (checkbox instanceof HTMLInputElement) {
          checkbox.checked = false
        }
      })
    }
    target.checked = savedCheck
  }

  return (
    <article className='expandableLink flex relative min-h-10'>
      <input
        id={`checkbox-aside-${name}`}
        type='checkbox'
        hidden
        name='checkbox-aside-items'
        className='[&:checked~.dropDown]:h-fit [&:not(:checked)~.dropDown]:h-10 [&:checked~label>div]:rotate-180'
        onInput={handleInput}
      />
      <div className='absolute w-full h-10 flex justify-between gap-2 items-center'>
        <Link
          to={path}
          className={`${path === pathname ? 'actualPath bg-selected font-medium' : 'hover:bg-neutral-800'}
            flex-1 max-w-[204px] h-10 min-h-10 flex items-center gap-4 px-3 rounded-lg cursor-pointer active:bg-neutral-600`
          }
        >
          <div className='size-6 max-h-full aspect-square overflow-hidden'>
            <Icon active={path === pathname} />
          </div>
          <span>{name}</span>
        </Link>
        <div className='w-[2px] h-7 bg-neutral-800'></div>
        <label htmlFor={`checkbox-aside-${name}`} className='aspect-square flex items-center justify-center hover:bg-neutral-800 rounded-lg h-full cursor-pointer'>
          <div>
            <IconArrowDown />
          </div>
        </label>
      </div>
      <div className='dropDown w-full overflow-hidden rounded-lg [transition:height_250ms_ease] [interpolate-size:allow-keywords]'>
        <div className='w-full h-10' />
        {
          subItems?.map(sub => (
            <Link key={uuidv4()} to={sub.link} className='w-full h-10 flex items-center px-3 gap-4 hover:bg-neutral-800 rounded-lg'>
              <div className='size-6 max-h-full aspect-square overflow-hidden'>
                { sub.Icon && <Icon /> }
              </div>
              <span>{sub.name}</span>
            </Link>
          ))
        }
      </div>
    </article>
  )
}
