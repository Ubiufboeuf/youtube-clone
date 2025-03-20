import type { Video } from '@/env'
import { useRef, useState, type ChangeEvent } from 'react'

export function VideoOptions ({ videoInfo }: { videoInfo: Video }) {
  const [optionSelected, setOptionSelected] = useState(videoInfo.selectedOption)
  const optionsWrapperRef = useRef<HTMLDivElement>(null)
  const options = videoInfo.availableOptions

  function handleSelectOption (event: ChangeEvent<HTMLInputElement>) {
    const { target } = event
    const option = target.getAttribute('data-option')
    if (!option) return
    setOptionSelected(option)
    // updateVideoSelectedOption(option)
  }

  return (
    <div ref={optionsWrapperRef} className='absolute right-0 h-fit w-fit bg-neutral-900 text-neutral-100 flex flex-col'>
      {
        options.map(option => {
          return (
            <label key={crypto.randomUUID()} className='flex gap-2 p-2'>
              <input
                type='checkbox'
                name='options'
                onInput={handleSelectOption}
                data-option={option}
                defaultChecked={optionSelected === option}
              />
              <span>{option}</span>
            </label>
          )
        })
      }
    </div>
  )
}
