export function HomeNav () {
  return (
    <nav
      id='homeNav'
      className='
        fixed right-0 top-14 flex h-14 w-[calc(100%-240px)] bg-primary-dark px-6 z-[1]
        [&_label]:w-fit [&_label]:h-fit [&_label]:px-3 [&_label]:py-1.5 [&_label]:bg-neutral-800 [&_label]:rounded-lg [&_label]:flex [&_label:has(input:checked)]:bg-[#F1F1F1] [&_label:has(input:checked)]:text-primary-dark [&_label:hover]:cursor-pointer [&_label:has(input:checked):hover]:bg-white [&_label:not(:has(input:checked)):hover]:bg-neutral-700
        [&_span]:h-full [&_span]:w-full [&_span]:flex [&_span]:items-center [&_span]:justify-center [&_span]:text-sm [&_span]:font-semibold [&_span]:opacity-95
      '
    >
      <div className='min-w-full w-fit gap-3 flex items-center h-full'>
        <label>
          <input type='radio' defaultChecked hidden name='nav-tags' />
          <span>Todos</span>
        </label>
        <label>
          <input type='radio' hidden name='nav-tags' />
          <span>Música</span>
        </label>
        <label>
          <input type='radio' hidden name='nav-tags' />
          <span>Etc</span>
        </label>
        <label>
          <input type='radio' hidden name='nav-tags' />
          <span>Los tags se deberian sacar del servidor</span>
        </label>
      </div>
    </nav>
  )
}
