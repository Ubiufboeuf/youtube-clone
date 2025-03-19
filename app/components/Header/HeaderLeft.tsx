// ---
// const { pathname } = Astro.url

import { Link } from 'react-router'
import { IconMenu, IconYouTube } from '../Icons'

// ---
const pathname: string = '/'

export default function HeaderLeft () {
  
  return (
    <section
      className='flex items-center justify-start gap-4 px-4 h-14 max-w-52 flex-1'
    >
      <label
        id='label-for-checkbox'
        role='button'
        htmlFor={pathname === '/' ? 'checkbox-home-aside-menu' : 'checkbox-aside-menu'}
        className='h-10 aspect-square rounded-full hover:bg-[#4446] justify-center items-center flex cursor-pointer border border-transparent active:bg-[#3D3D3D] transition-colors'
      >
        <div className='h-6 w-6 fill-white'>
          <IconMenu />
        </div>
      </label>
      <Link to='/' className='h-10 w-fit flex items-center fill-white relative'>
        <div className='h-5 [&>svg]:max-h-full'>
          <IconYouTube />
          <span
            id='region-for-logo'
            className='absolute -right-4 top-0.5 text-[10px] opacity-70 select-none'
          >
            UY
          </span>
        </div>
      </Link>
    </section>

  )
}
