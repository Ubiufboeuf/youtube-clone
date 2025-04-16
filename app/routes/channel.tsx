// import { Navigate } from 'react-router'

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

export default function Channel () {
  const [channelId, setChannelId] = useState<string>('')
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const channelId = searchParams.get('id')
    console.log(searchParams, channelId)
    setChannelId(channelId ?? '')
  }, [])

  return (
    channelId ? (
      `channel: ${channelId}`
    ) : (
      'No se especificó la id del canal'
    )
  )
}
