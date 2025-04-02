export type Video = {
  id: string
  duration: number
  timeSeen: number
  creatorId: string
  title: string
  views: number
  publicationDateTime: string
  posters: string[]
  availableOptions: string[]
  selectedOption: string,
  description: string
}

type AvailableOptions = 'audio_only' | '144p' | '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '2160p'
type Sources<T> = {
  [Property in keyof T]: string
}

export type Creator = {
  id: string
  name: string
  verified: boolean | 'music'
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

export type ItemAside = {
  name: string
  path: string
  type?: string
  Icon: ({ active }: { active?: boolean | undefined }) => JSX.Element
}
