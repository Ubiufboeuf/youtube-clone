import { v4 as uuidv4 } from 'uuid'
import type { Video } from '@/env'
import { useRef, useState, type ChangeEvent } from 'react'

export function VideoQualities ({ videoInfo }: { videoInfo: Video }) {
  const [optionSelected, setOptionSelected] = useState(videoInfo.selectedQuality)
  const optionsWrapperRef = useRef<HTMLDivElement>(null)
  const options = videoInfo.qualities

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
        options.map((option, idx) => {
          return (
            <label key={uuidv4()} className='flex gap-2 p-2'>
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
