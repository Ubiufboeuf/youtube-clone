import HeaderCenter from './HeaderCenter'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'

export default function Header () {
  return (
    <header className='fixed top-0 w-full h-14 sm:grid flex justify-between sm:place-items-center items-center grid-cols-[208px_1fr_208px] z-[100] bg-primary-dark backdrop-blur-3xl'>
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </header>
  )
}
