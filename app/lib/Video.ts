import type { Thumbnail, Video, VideoFromServer } from '@/env'
import { THUMBNAIL_ENDPOINT, VIDEO_ENDPOINT } from './constants'

export function formVideo (v: VideoFromServer) {
  // console.log(v)
  // const posters: {[key: string]: string} = {}
  // v.posters.forEach(poster => posters[poster] = `${POSTER_ENDPOINT}/${v.id}/${poster}`)

  // const video: Video = {
  //   id: v.id,
  //   creatorId: v.creatorId,
  //   description: v.description,
  //   duration: v.duration,
  //   posters,
  //   publicationDate: v.publicationDate,
  //   qualities: v.qualities,
  //   source: `${VIDEO_ENDPOINT}/${v.id}/manifest.mpd`,
  //   title: v.title,
  //   views: v.views,
  //   background: v.hasBackground ? `${BACKGROUND_ENDPOINT}/${v.id}` : undefined
  // }

  const thumbnails: Thumbnail[] = []
  v.thumbnails.forEach(t => t.url = `${THUMBNAIL_ENDPOINT}/${t.url}`)

  const video: Video = {
    ...v,
    source: `${VIDEO_ENDPOINT}/${v.id}/manifest.mpd`,
    thumbnails
  }
  return video
}
