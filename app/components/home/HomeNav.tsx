import { useRef, type ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IconMagicFeed } from '../Icons'

const TAG_FILTERS = {
  ALL: 'all',
  MUSIC: 'music',
  ELSE: 'else',
  ANOTHER: 'another'
}
const tags = [
  { name: 'Todos', filter: TAG_FILTERS.ALL },
  { name: 'Música', filter: TAG_FILTERS.MUSIC },
  { name: 'All', filter: TAG_FILTERS.ELSE },
  { name: 'Tag largo para probar el overflow, nono, más largo todavía, dale nomás, segui, ya casi, más, creo que es suficiente, si, perfecto', filter: TAG_FILTERS.ANOTHER }
]

export function HomeNav () {
  const tagsWrapperRef = useRef<HTMLDivElement>(null)
  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    // De alguna forma lo de abajo funciona perfecto ._.
    const { currentTarget: input } = event
    const toCheck = input.checked
    if (!tagsWrapperRef.current) return
    [...tagsWrapperRef.current.children].forEach(label => {
      if (label.children[0] instanceof HTMLInputElement)
        label.children[0].checked = false
    })
    const filter = input.getAttribute('data-filter')
    input.checked = true
    if (toCheck && filter !== TAG_FILTERS.ALL) return
    if (filter !== TAG_FILTERS.ALL) {
      input.checked = false
      if (tagsWrapperRef.current.children[0].children[0] instanceof HTMLInputElement) {
        tagsWrapperRef.current.children[0].children[0].checked = true
      }
    }
  }
  
  return (
    <nav
      id='homeNav'
      className='fixed right-0 [transition:width_250ms_ease] top-14 h-10 flex items-end xs:h-14 py-2 w-full ml:w-[calc(100%-240px)] bg-primary-dark px-6 z-[1]'
    >
      <div className='max-w-full w-full gap-3 flex items-center h-7 xs:h-9 overflow-x-auto [scrollbar-width:none]'>
        <button className='h-full min-w-7 xs:min-w-fit flex items-center justify-center cursor-pointer px-1 xs:px-3 bg-neutral-700 xs:rounded-lg rounded-md'>
          <div className='xs:size-6 size-4 flex items-center justify-center overflow-hidden'>
            <IconMagicFeed />
          </div>
        </button>
        <div ref={tagsWrapperRef} className='flex items-center gap-3 h-full w-fit min-w-fit'>
          {
            tags.map(tag => (
              <label
                key={uuidv4()}
                className='w-fit min-w-fit h-full xs:px-4 px-3 bg-neutral-700 xs:rounded-lg rounded-md flex [&:has(:checked)]:bg-[#f1f1f1] [&:has(:checked)]:text-primary-dark cursor-pointer [&:has(:checked):hover]:bg-white [&:not(:has(:checked)):hover]:bg-neutral-700'
              >
                <input
                  type='checkbox'
                  defaultChecked={tag.filter === TAG_FILTERS.ALL}
                  hidden
                  data-filter={tag.filter}
                  onChange={handleChange}
                />
                <span className='flex flex-nowrap min-w-fit h-full w-fit text-nowrap items-center justify-center xs:text-sm text-xs font-semibold opacity-95'>{tag.name}</span>
              </label>
            ))
          }
        </div>
      </div>
    </nav>
  )
}
