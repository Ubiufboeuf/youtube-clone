export type Media = {
  id: string
  duration: number
  timeSeen: number
  creatorId: string
  title: string
  views: number
  publicationDate: string
  poster: string
  sources: { [key: string]: string }
  availableOptions: string[]
  description: string
}

type AvailableOptions = 'audio_only' | '144p' | '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '2160p'
type Sources = {
  [key: AvailableOptions]: string
}

export type Creator = {
  id: string
  name: string
  verified: boolean | 'music'
  avatar: string
  avatar_icon: string
  description: string
  links: {
    name: string
    link: string
  }[]
  details: {
    channelURL: string
    country: string
    joined: string
    subscriptions: number
    videosCount: number
    views: number
  }
}

export type Player = {
  currentTime: number | undefined
  duration: number
  paused: boolean
}
