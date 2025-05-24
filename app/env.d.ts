export interface VideoFromServer extends object {
  id: string
  title: string
  description: string
  channel_id: string
  channel_url: string
  duration: number
  view_count: number
  webpage_url: string
  categories: string[]
  tags: string[]
  like_count: number
  is_live: boolean
  was_live: boolean
  release_datestring: string
  availability: string
  uploader: string
  uploader_id: `@${string}`
  uploader_url: `${string}@${string}`
  language: string
  thumbnails: Thumbnail[]
  thumbnail: string
  minimalThumbnail: string
  formats: Format[]
  release_timestamp: number
}

export interface Video extends VideoFromServer {
  source: string
}

// export type Video = {
//   id: string
//   duration: number
//   creatorId: string
//   title: string
//   views: number
//   publicationDate: string
//   posters: {[key: string]: string}
//   background?: string
//   qualities: string[]
//   description: string
//   source: string
// }

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

export interface Thumbnail {
  id?: string
  height?: number
  width?: number
  resolution?: `${number}x${number}`
  url?: string
}

export interface Format {
  duration?: number
  ext?: string
  type?: 'audio' | 'video'
  resolution?: string
  aspect_ratio?: number
  height?: number
  width?: number
}
