import type { Video, VideoFromServer } from '@/env'
import { BACKGROUND_ENDPOINT, POSTER_ENDPOINT, VIDEO_ENDPOINT } from './constants'

export function formVideo (v: VideoFromServer) {
  const posters: {[key: string]: string} = {}
  v.posters.forEach(poster => posters[poster] = `${POSTER_ENDPOINT}/${v.id}/${poster}`)

  const video: Video = {
    id: v.id,
    creatorId: v.creatorId,
    description: v.description,
    duration: v.duration,
    posters,
    publicationDate: v.publicationDate,
    qualities: v.qualities,
    source: `${VIDEO_ENDPOINT}/${v.id}/manifest.mpd`,
    title: v.title,
    views: v.views,
    background: v.hasBackground ? `${BACKGROUND_ENDPOINT}/${v.id}` : undefined
  }
  return video
}
