const VideoCardFallback = () => (
  <article className='videoCardFallback h-full w-full flex flex-col'>
    <section className='w-full aspect-video bg-neutral-700 rounded-xl' />
    <section className='w-full flex min-h-[116px] h-full pt-3 gap-2 flex-1'>
      <div className='size-9 mr-1 bg-neutral-700 rounded-full' />
      <div className='flex-1 h-fit'>
        <div className='w-[90%] h-4 bg-neutral-700 rounded mb-3' />
        <div className='w-[60%] h-4 bg-neutral-700 rounded' />
      </div>
    </section>
  </article>
)

export default VideoCardFallback
