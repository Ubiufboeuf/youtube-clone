import { title } from '@/lib/utils'
import type { Route } from './+types/tv'

export function meta ({ }: Route.MetaArgs) {
  return [
    { title: title('TV') }
  ]
}

export default function TV () {
  return (
    <div>tv</div>
  )
}
