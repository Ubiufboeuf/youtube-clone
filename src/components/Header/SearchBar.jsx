import { useRef } from 'react'

const searchByVoiceText = 'Realiza búsquedas con la voz'

export function SearchBar () {
  const searchValueRef = useRef()
  const inputRef = useRef()
  const clearInputRef = useRef()

  function handleInput (e) {
    const { value } = e.target
    searchValueRef.current = value
    checkVisibility(value)
  }

  function checkVisibility (value) {
    clearInputRef.current.hidden = (value) ? !value : !searchValueRef.current // Si no hay valor es hidden, sino es visible
  }

  function clearInput () {
    inputRef.current.value = ''
    searchValueRef.current = ''
    inputRef.current.focus()
    checkVisibility()
  }

  function handleSubmit (e) {
    e.preventDefault()
    checkVisibility()
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
              <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' viewBox='0 0 24 24' width='24' focusable='false' aria-hidden='true' style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
                <path clipRule='evenodd' d='M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z' fillRule='evenodd' />
              </svg>
            </div>
          </div>
          <input
            id='search-bar'
            ref={inputRef}
            type='text'
            placeholder='Buscar'
            className='h-full w-full bg-transparent focus:outline-0 placeholder:text-neutral-500'
            onInput={handleInput}
          />
          <button id='clear-input-btn' className='absolute right-0 h-full hover:bg-[#6666] rounded-full aspect-square' ref={clearInputRef} hidden onClick={clearInput}>
            <div className='fill-white flex justify-center items-center h-6'>
              <svg xmlns='http://www.w3.org/2000/svg' enableBackground='new 0 0 24 24' height='24' viewBox='0 0 24 24' width='24' focusable='false' aria-hidden='true' style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
                <path d='m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z' />
              </svg>
            </div>
          </button>
        </form>
        <button id='search-btn' className='rounded-tr-full rounded-br-full border-[1px] border-l-0 w-16 border-[#6666] flex justify-center items-center bg-neutral-800'>
          <div className='h-6'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' viewBox='0 0 24 24' width='24' focusable='false' aria-hidden='true' style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
              <path clipRule='evenodd' d='M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z' fillRule='evenodd' />
            </svg>
          </div>
        </button>
      </div>
      <button
        id='search-by-voice-btn'
        className='h-10 aspect-square relative rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center hover:transition-colors focus:outline-0 focus:border-2 [&:hover>span]:opacity-100 [&:hover>span]:flex'
      >
        <span id='search-by-voice-tooltip' className='absolute top-14 left-[50%] -translate-x-[50%] hidden transition-opacity opacity-0 bg-[#666a] h-8 min-w-max justify-center items-center p-2 rounded-md text-xs'>{searchByVoiceText}</span>
        <div className='h-6 fill-white'>
          <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24' focusable='false' aria-hidden='true' style={{ pointerEvents: 'none', display: 'inherit', width: '100%', height: '100%' }}>
            <path d='M12 3c-1.66 0-3 1.37-3 3.07v5.86c0 1.7 1.34 3.07 3 3.07s3-1.37 3-3.07V6.07C15 4.37 13.66 3 12 3zm6.5 9h-1c0 3.03-2.47 5.5-5.5 5.5S6.5 15.03 6.5 12h-1c0 3.24 2.39 5.93 5.5 6.41V21h2v-2.59c3.11-.48 5.5-3.17 5.5-6.41z' />
          </svg>
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
