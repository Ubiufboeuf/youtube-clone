import type { Media } from '@/env'

export function MediaOptions ({ mediaInfo }: { mediaInfo: Media }) {
  const options = Object.entries(mediaInfo.sources)
  return (
    <div className='absolute right-0 h-fit w-fit bg-neutral-900 text-neutral-100 flex flex-col'>
      {
        options.map(([key, value]) => {
          return (
            <label key={crypto.randomUUID()} className='flex gap-2 p-2'>
              <input type='radio' name='options' />
              <span>{key}</span>
            </label>
          )
        })
      }
    </div>
  )
}
