import type { ReactNode } from 'react'
import { Link } from 'react-router'

export const MenuLink = ({ name, link, path, children }: { name: string, link: string, path: string, children: ReactNode }) => {
  return (
    <Link
      to={link}
      className={`${link === path ? 'actualPath bg-bg-selected font-medium' : 'hover:bg-neutral-800'} h-10 min-h-10 flex items-center gap-4 px-3 rounded-lg cursor-pointer active:bg-neutral-600 flex-1 w-full`}
    >
      <div
        className='h-6 aspect-square'
      >
        {children}
      </div>
      <span className='text-sm text-nowrap overflow-ellipsis overflow-hidden'>{name}</span>
    </Link>
  )
}
