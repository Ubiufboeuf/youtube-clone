import type { Creator, Video, VideoFromServer } from '@/env'
import { formVideo } from './Video'
import { DATA_ENDPOINT } from './constants'


export function getAllVideos ({ from = 0, to = 0 }: { from?: number, to: number }): Promise<Video[]> {
  return new Promise((resolve, reject) => {
    fetch(`${DATA_ENDPOINT}/videos?range=${from}_${to}`)
      .then(res => res.json())
      .catch(() => {
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
      .catch(() => {
        reject('Error formando los videos')
      })
  })
}

export function getCreatorById (id: string): Promise<Creator> {
  return new Promise((resolve, reject) => {
    if (!id) reject('Falta especificar la id del creador')
    fetch(`${DATA_ENDPOINT}/creator?id=${id}`)
      .then(res => res.json())
      .catch(() => {
        reject('Error consiguiendo la información del creador')
      })
      .then(data => {
        const creator = data.creator
        // console.log('creator:', creator)
        resolve(creator)
      })
      .catch(() => {
        reject('Error formando la información del creador')
      })
  })
}

export function getVideoById (id: string): Promise<Video> {
  return new Promise((resolve, reject) => {
    if (!id) reject('Falta especificar la id del video')
    fetch(`${DATA_ENDPOINT}/video?id=${id}`)
      .then(res => res.json())
      .catch(() => {
        console.error('Error obteniendo el video')
      })
      .then(({ success, status, video, msg }: { success: boolean, status: number, video: VideoFromServer, msg?: string }) => {
        if (success) {
          const formedVideo = formVideo(video)
          console.log('videoByid', formedVideo)
          resolve(formedVideo)
        } else if (status === 500) {
          reject('error interno del servidor')
        } else {
          reject(msg)
        }
      })
      .catch(() => {
        console.error('Error formando el video')
      })
  })
}
