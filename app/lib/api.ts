import type { Creator, Video, VideoFromServer } from '@/env'
import { formVideo } from './Video'
import { DATA_ENDPOINT, ERROR_ENDPOINT } from './constants'


function sendErrorToServer (error: string | Error) {
  fetch(ERROR_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ error }, null, 2)
  })
}

export function getAllVideos ({ from = 0, to = 0 }: { from?: number, to: number }): Promise<Video[]> {
  return new Promise((resolve, reject) => {
    fetch(`${DATA_ENDPOINT}/videos?range=${from}_${to}`)
      .then(res => res.json())
      .catch(err => {
        sendErrorToServer(err)
        reject('Error consiguiendo los videos')
      })
      .then(data => {
        if (!data.success) return reject(data.msg)
        const videos: Video[] = []
        data.videos.forEach((video: VideoFromServer) => {
          videos.push(formVideo(video))
        })
        resolve(videos)
      })
      .catch(err => {
        sendErrorToServer(err)
        reject('Error formando los videos')
      })
  })
}

export function getCreatorById (id: string): Promise<Creator> {
  return new Promise((resolve, reject) => {
    if (!id) reject('Falta especificar la id del creador')
    fetch(`${DATA_ENDPOINT}/creator?id=${id}`)
      .then(res => res.json())
      .catch(err => {
        sendErrorToServer(err)
        reject('Error consiguiendo la información del creador')
      })
      .then(data => {
        const creator = data.creator
        // console.log('creator:', creator)
        resolve(creator)
      })
      .catch(err => {
        sendErrorToServer(err)
        reject('Error formando la información del creador')
      })
  })
}

export function getVideoById (id: string): Promise<Video> {
  return new Promise((resolve, reject) => {
    if (!id) reject('Falta especificar la id del video')
    fetch(`${DATA_ENDPOINT}/video?id=${id}`)
      .then(res => res.json())
      .then(({ success, status, video, msg }: { success: boolean, status: number, video: VideoFromServer, msg?: string }) => {
        if (success) {
          resolve(formVideo(video))
        } else if (status === 500) {
          reject('error interno del servidor')
        } else {
          reject(msg)
        }
      })
  })
}
