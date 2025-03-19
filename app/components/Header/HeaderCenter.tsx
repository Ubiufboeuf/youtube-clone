import { useRef } from 'react'
import { IconMicro, IconSearch, IconX } from '@/components/Icons'

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
    console.log(value)
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
    <section className='flex flex-1 items-center h-full justify-end max-w-[732px] gap-4 overflow-visible -ml-14'>
      <div className='flex w-fit max-w-full relative h-10'>
        <form
          onSubmit={handleSubmit}
          className='h-full max-w-fit min-w-[min(538px,60vw)] rounded-tl-full rounded-bl-full px-4 border-[1px] border-[#6666] bg-[#121212] text-base align-middle focus-within:border-[#1C62B9] focus:outline-0 cursor-text flex items-center justify-between relative hover:transition-colors'
        >
          <div id='searchIconLeft' className='h-5 w-8 hidden justify-start'>
            <div className='h-full aspect-square flex justify-center items-center'>
              <IconSearch />
            </div>
          </div>
          <input
            id='search-bar'
            ref={inputRef}
            placeholder='Buscar'
            className='h-full w-full bg-transparent focus:outline-0 placeholder:text-neutral-500'
            onInput={handleInput}
          />
          <button id='clear-input-btn' className='absolute right-0 h-full hover:bg-[#6666] rounded-full aspect-square' ref={clearInputRef} hidden onClick={clearInput}>
            <div className='fill-white flex justify-center items-center h-6'>
              <IconX />
            </div>
          </button>
        </form>
        <button id='search-btn' className='rounded-tr-full rounded-br-full border-[1px] border-l-0 w-16 border-[#6666] flex justify-center items-center bg-neutral-800'>
          <div className='h-6'>
            <IconSearch />
          </div>
        </button>
      </div>
      <button
        id='search-by-voice-btn'
        className='h-10 aspect-square relative rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center hover:transition-colors focus:outline-0 focus:border-2 [&:hover>span]:opacity-100'
      >
        <span id='search-by-voice-tooltip' className='absolute top-14 left-[50%] -translate-x-[50%] flex transition-opacity opacity-0 bg-[#666a] h-8 min-w-max justify-center items-center p-2 rounded-md text-xs pointer-events-none'>Realiza búsquedas con la voz</span>
        <div className='h-6 fill-white'>
          <IconMicro />
        </div>
      </button>

      <style>
        {`
          form {
            min-width: min(538px, 60vw);

            & #seachIconLeft { display: none; }

            &:focus-within {
              min-width: min(568px, 60vw);
              
              & #searchIconLeft { display: flex; }
            }
          }
        `}
      </style>
    </section>
  )
}
