import HeaderCenter from './HeaderCenter'
import HeaderLeft from './HeaderLeft'
import HeaderRight from './HeaderRight'

export default function Header () {
  return (
    <header className='fixed top-0 w-full h-14 flex items-center justify-between z-10 [&.a]:bg-[#0f0f0fdd] bg-[#0f0f0f] backdrop-blur-3xl'>
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </header>
  )
}
