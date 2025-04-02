import { title } from '@/lib/utils'
import type { Route } from './+types/explore'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: title('Explorar') }
  ]
}

export default function AboutThisProject () {
  return (
    <div>
      about
    </div>
  )
}
