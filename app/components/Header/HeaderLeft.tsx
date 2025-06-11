import { Link } from 'react-router'
import { IconMenu, IconYouTube } from '../Icons'
import { useAsideMenuStore } from '@/stores/useAsideMenuStore'

export default function HeaderLeft () {  
  const isAsideOpened = useAsideMenuStore(state => state.isOpen)
  const setIsAsideOpened = useAsideMenuStore(state => state.setIsOpen)

  function toggleAsideMenu () {
    setIsAsideOpened(!isAsideOpened)
  }

  return (
    <section
      className='flex items-center justify-start gap-4 xs:px-4 px-2 h-14 w-full flex-1'
    >
      <button
        className='h-10 aspect-square rounded-full hover:bg-[#4446] justify-center items-center flex cursor-pointer border border-transparent active:bg-[#3D3D3D] transition-colors focus:outline-0'
        onClick={toggleAsideMenu}
      >
        <div className='h-6 w-6 fill-white'>
          <IconMenu />
        </div>
      </button>
      <Link to='/' className='h-10 w-fit flex items-center fill-white relative'>
        <div className='h-5 [&>svg]:max-h-full'>
          <IconYouTube />
        </div>
      </Link>
    </section>
  )
}
