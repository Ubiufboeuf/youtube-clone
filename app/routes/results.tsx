import { useLocationStore } from '@/stores/useLocationStore'

export default function Results () {
  const location = useLocationStore((state) => state.location)
  return (
    <span>{location?.search}</span>
  )
}
