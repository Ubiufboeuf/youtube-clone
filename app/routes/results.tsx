import { useLocation } from 'react-router'

export default function Results () {
  const location = useLocation()
  return (
    <span>{location?.search}</span>
  )
}
