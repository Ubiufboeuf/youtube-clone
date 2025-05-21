import { Link } from 'react-router'

export function HomeAnonimous () {
  return (
    <div className='fixed left-1/2 top-1/2 [transform:translate(-50%,-50%)] h-fit gap-8 w-124 p-6 bg-neutral-800 border-[1px] border-neutral-600 rounded-xl flex flex-col items-center justify-between'>
      <h1 className='text-2xl font-bold text-center'>¡Bienvenido a YouTube!</h1>
      <p className='-mt-2 text-center'>Acá podrás encontrar
        <strong> videos </strong>y<strong> shorts </strong>
        de todo tipo, y si no sabes qué buscar, el&nbsp;
        <Link to='/tv' className='relative w-fit h-fit group inline-flex'>
          <span className='opacity-0'>modo TV</span>
          <strong className='absolute z-[1] left-1/2 top-1/2 [transform:translate(-50%,-50%)] text-nowrap [background-image:var(--color-pink-gradient)] [background-clip:text] text-transparent'>modo TV</strong>
          <strong className='absolute z-[2] left-1/2 top-1/2 [transform:translate(-50%,-50%)] text-nowrap [background-image:var(--color-gradient)] [background-clip:text] text-transparent transition-opacity opacity-0 group-hover:opacity-100'>modo TV</strong>
        </Link>
        &nbsp;será lo mejor para tí.
      </p>
      <span className='text-neutral-400 text-wrap text-xs text-center'>Necesitas consumir contenido para poder recomendarte cosas, <br />
        <strong>¡animate a hacer tu primera búsqueda!</strong>
      </span>
    </div>
  )
}
