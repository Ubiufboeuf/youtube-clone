import { Link } from 'react-router'
import { IconAdd, IconNotifications, IconSettings } from '../Icons'

export default function HeaderRight () {
  return (
    <section className='flex flex-1 w-full h-14 items-center justify-end px-4'>
      <Link to='' className='h-10 max-h-full aspect-square flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors'>
        <div className='size-6 flex items-center justify-center overflow-hidden'>
          <IconAdd />
        </div>
      </Link>
      <Link to='' className='h-10 max-h-full aspect-square flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors'>
        <div className='size-6 flex items-center justify-center overflow-hidden'>
          <IconNotifications notifications='outline' />
        </div>
      </Link>
      <Link to='' className='h-10 max-h-full aspect-square flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors'>
        <div className='size-6 flex items-center justify-center overflow-hidden'>
          <IconSettings />
        </div>
      </Link>
      <Link to='' className='h-10 max-h-full aspect-square flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors bg-neutral-900'>
        <div className='size-6 flex items-center justify-center overflow-hidden'>
          {/* <user.Icon /> */}
        </div>
      </Link>
    </section>
  )
}
