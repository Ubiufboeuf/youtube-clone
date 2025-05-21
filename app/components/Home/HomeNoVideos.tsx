export function HomeNoVideos () {
  return (
    <div className='h-full w-full flex items-center justify-center flex-col gap-4 px-4'>
      <h1 className='text-2xl font-bold'>Hubo un error consiguiendo los videos</h1>
      <p className='w-112 max-w-full text-pretty'>
        Si recargar la página no soluciona el error ponte en contacto con el
        <a href='#lol' className='text-blue-400'> soporte técnico </a>
        para solucionar el problema.
      </p>
    </div>
  )
}
