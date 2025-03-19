import { Navigate } from 'react-router'

export default function channel () {
  const url = new URL(window.location.href)
  const usp = url.pathname.split('/@')
  const channelId = usp?.[1]
  
  if (
    usp.length === 1 ||
    !channelId ||
    channelId.includes('/') ||
    channelId.includes('@')
  ) return <Navigate to='/404' />

  return (
    `channel: ${channelId}`
  )
}
