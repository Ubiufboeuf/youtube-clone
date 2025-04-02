import { Link } from 'react-router'
import { IconMenu, IconYouTube } from '../Icons'

export default function HeaderLeft () {  
  return (
    <section
      className='flex items-center justify-start gap-4 px-4 h-14 w-full flex-1'
    >
      <label
        id='label-for-checkbox'
        role='button'
        htmlFor='checkbox-home-aside-menu'
        className='h-10 aspect-square rounded-full hover:bg-[#4446] justify-center items-center flex cursor-pointer border border-transparent active:bg-[#3D3D3D] transition-colors'
      >
        <div className='h-6 w-6 fill-white'>
          <IconMenu />
        </div>
      </label>
      <Link to='/' className='h-10 w-fit flex items-center fill-white relative'>
        <div className='h-5 [&>svg]:max-h-full'>
          <IconYouTube />
        </div>
      </Link>
    </section>
  )
}
