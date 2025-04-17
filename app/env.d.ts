export type Video = {
  id: string
  duration: number
  creatorId: string
  title: string
  views: number
  publicationDate: string
  posters: {[key: string]: string}
  background?: string
  qualities: string[]
  description: string
  source: string
}

export type VideoFromServer = {
  id: string
  duration: number
  creatorId: string
  title: string
  views: number
  publicationDate: string
  posters: string[]
  hasBackground: boolean
  qualities: string[]
  description: string
}

export type Creator = {
  id: string
  name: string
  verified: boolean | 'music'
  description: string
  avatars: { [key: string]: string }
  banner?: string
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

export type AnonimousUser = {
  id: string
  type: 'anonimous' | 'user'
  videosVistos: VideoVisto[]
  preferedQuality: string
}

export interface User extends AnonimousUser {
  name: string
}

export type VideoVisto = {
  videoId: string
  timeSeen: number
}
