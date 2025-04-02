import { useRef } from 'react'
import { IconMic, IconSearch, IconClose } from '@/components/Icons'

export default function HeaderCenter () {
  const searchValueRef = useRef('')
  const inputRef = useRef<HTMLInputElement>(null)
  const clearInputRef = useRef<HTMLButtonElement>(null)

  function handleInput (event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target) return
    const { value } = event.target
    searchValueRef.current = value
    checkVisibility(value)
  }

  function checkVisibility (value: string) {
    clearInputRef.current!.hidden = value ? !value : !searchValueRef.current // Si no hay valor es hidden, sino es visible
  }

  function clearInput () {
    if (inputRef.current) {
      inputRef.current.value = ''
      searchValueRef.current = ''
      inputRef.current.focus()
      checkVisibility('')
    }
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    checkVisibility('')
  }

  return (
    <section className='sm:flex hidden flex-1 items-center h-full justify-center min-w-fit max-w-full w-full gap-4 overflow-hidden'>
      <div className='flex w-full max-w-xl relative h-10'>
        <form
          onSubmit={handleSubmit}
          className='h-full max-w-full w-full rounded-full px-2 border-[1px] border-[#6666] bg-[#121212] text-base align-middle focus-within:border-[#1C62B9] focus:outline-0 cursor-text flex items-center justify-between relative hover:transition-colors [&:focus-within>#searchIconLeft]:flex'
        >
          <div className='h-full aspect-square flex items-center justify-center'>
            <div className='size-6 flex items-center justify-center opacity-50'>
              <IconSearch />
            </div>
          </div>
          <input
            id='search-bar'
            ref={inputRef}
            placeholder='Buscar'
            className='h-full w-full max-w-full bg-transparent focus:outline-0 placeholder:text-neutral-500'
            onInput={handleInput}
          />
          <button id='clear-input-btn' className='ml-2 h-full hover:bg-[#6666] flex items-center justify-center rounded-full aspect-square' ref={clearInputRef} hidden onClick={clearInput}>
            <div className='size-6 flex items-center justify-center opacity-50'>
              <IconClose />
            </div>
          </button>
          <button id='search-by-voice' className='rounded-full h-full hover:bg-[#6666] aspect-square flex items-center justify-center'>
            <div className='size-6 flex items-center justify-center opacity-50'>
              <IconMic />
            </div>
          </button>
        </form>
      </div>
    </section>
  )
}
