import { Link } from 'react-router'
import { IconHome, IconShorts, IconSubscriptions, IconYou } from '../Icons'

const path: string = '/'
const paths = {
  home: '/',
  shorts: '/shorts',
  subs: '/feed/subscriptions',
  you: '/feed/you'
}

export function AsideMenuMini () {
  return (
    <aside
      id='aside-menu-mini'
      className='
        fixed top-14 flex w-[72px] z-[1] left-0 flex-col items-center py-1 bg-primary-dark
        [&>a]:w-16 [&>a]:h-[74px] [&>a]:rounded-[10px] [&>a]:fill-white [&>a]:flex [&>a]:justify-center [&>a]:items-center [&>a]:flex-col [&>a]:gap-[5px] [&>a]:pt-[1px] [&>a]:cursor-pointer [&>a]:[transition_.2s_ease] [&>a:hover]:bg-[#323232] [&>a>div]:size-6 [&>a>span]:text-[10px]
      '
    >
      <Link to={paths.home}>
        <div>
          <IconHome active={path === paths.home} />
        </div>
        <span>Principal</span>
      </Link>
      <Link to={paths.shorts}>
        <div>
          <IconShorts active={path === paths.shorts} />
        </div>
        <span>Shorts</span>
      </Link>
      <Link to={paths.subs}>
        <div>
          <IconSubscriptions active={path === paths.subs} />
        </div>
        <span>Suscripciones</span>
      </Link>
      <Link to={paths.you}>
        <div>
          <IconYou active={path === paths.you} />
        </div>
        <span>Tú</span>
      </Link>
    </aside>
  )
}
