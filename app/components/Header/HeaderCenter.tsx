import { useEffect, useRef, type ChangeEvent, type FormEvent, type MouseEvent } from 'react'
import { IconMic, IconSearch, IconClose } from '@/components/Icons'
import { useLocation, useNavigate } from 'react-router'

export default function HeaderCenter () {
  const searchValueRef = useRef('')
  const inputRef = useRef<HTMLInputElement>(null)
  const clearInputRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const paramSearchRef = useRef('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    if (search?.trim() === '' || search == null) {
      return
    }
    updateSearch(encodeURIComponent(search))
  }, [])

  function updateSearch (newValue?: string | null) {
    const value = newValue ?? ''
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value
    }
    searchValueRef.current = value
    checkVisibility(value)
  }

  function handleInput (event: ChangeEvent<HTMLInputElement>) {
    if (!event.target) return
    const { value } = event.target
    updateSearch(value)
  }

  function checkVisibility (value: string) {
    if (clearInputRef.current) {
      clearInputRef.current.hidden = value ? !value : !searchValueRef.current // Si no hay valor es hidden, sino es visible
    }
  }

  function clearInput (event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    if (inputRef.current) {
      inputRef.current.value = ''
      searchValueRef.current = ''
      inputRef.current.focus()
      checkVisibility('')
    }
  }

  function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams(location?.search)
    paramSearchRef!.current = params.get('search') ?? ''
    if (paramSearchRef.current === searchValueRef.current || !searchValueRef.current) return
    navigate(`/results?search=${encodeURIComponent(searchValueRef.current)}`)
  }

  return (
    <section className='sm:flex hidden flex-1 items-center h-full justify-center min-w-fit max-w-full w-full gap-4 overflow-hidden'>
      <div className='flex w-full max-w-xl relative h-10'>
        <form
          onSubmit={handleSubmit}
          className='h-full max-w-full w-full rounded-full border-[1px] border-[#6666] bg-[#121212] overflow-hidden text-base align-middle focus-within:border-[#1C62B9] focus:outline-0 cursor-text flex items-center justify-between relative hover:transition-colors [&:focus-within>#searchIconLeft]:flex'
        >
          <div className='h-full aspect-[1.4/1] flex items-center justify-center'>
            <div className='size-6 flex items-center justify-center opacity-50'>
              <IconSearch />
            </div>
          </div>
          <input
            id='search-bar'
            ref={inputRef}
            placeholder='Buscar'
            className='h-full w-full max-w-full px-1 bg-transparent focus:outline-0 placeholder:text-neutral-500'
            onInput={handleInput}
          />
          <button
            id='clear-input-btn'
            className='h-full hover:bg-[#6666] cursor-pointer transition-colors flex items-center justify-center rounded-full aspect-square' ref={clearInputRef}
            hidden
            onClick={clearInput}
            type='button'
          >
            <div className='size-6 flex items-center justify-center opacity-50'>
              <IconClose />
            </div>
          </button>
          <button id='search-by-voice' className='rounded-full h-full cursor-pointer hover:bg-[#6666] transition-colors aspect-[1.4/1] flex items-center justify-center'>
            <div className='size-6 flex items-center justify-center opacity-50'>
              <IconMic />
            </div>
          </button>
        </form>
      </div>
    </section>
  )
}
