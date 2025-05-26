export function Devices () {
  return (
    <div className='fixed left-1/2 top-1/2 z-[999] [transform:translate(-50%,-50%)] w-fit h-fit text-2xl justify-center items-center bg-black p-8'>
      <p className='mobile:flex hidden'>mobile</p>
      <p className='laptop:flex hidden'>laptop</p>
      <p className='tablet:flex hidden'>tablet</p>
      <p className='not-touch:flex hidden'>no touch</p>
      <p className='touch:flex hidden'>touch</p>
    </div>
  )
}
