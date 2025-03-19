import { title } from '@/lib/utils'
import type { Route } from './+types/shorts'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: title('Shorts') }
  ]
}

export default function shorts () {
  return (
    <div>Shorts</div>
  )
}
