import type { Creator, Video } from '@/env'
const SERVER_URL = 'http://192.168.1.4:1234'
export const VIDEO_ENDPOINT = `${SERVER_URL}/video` // de acá se trae el video, el stream de datos
export const DATA_ENDPOINT = `${SERVER_URL}/data` // endpoint de información, ej: info de un video o creador
export const ERROR_ENDPOINT = `${SERVER_URL}/error`

function sendErrorToServer (error: string | Error) {
  fetch(ERROR_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ error }, null, 2)
  })
}

export function getAllVideos ({ from = 0, to = 0 }: { from: number, to: number }): Promise<Video[]> {
  return new Promise((resolve, reject) => {
    fetch(`${DATA_ENDPOINT}/videos?range=${from}_${to}`)
      .then(res => res.json())
      .catch(err => {
        sendErrorToServer(err)
        reject('Error consiguiendo los videos')
      })
      .then(data => {
        console.log('data:', data)
        if (!data.success) {
          reject(data.msg)
          return
        }
        const videos: Video[] = data.videos
        console.log('videos')
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
        console.log('creator:', creator)
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
  })
}
