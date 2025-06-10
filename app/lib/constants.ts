const SERVER_URL = import.meta.env.VITE_SERVER_URL
export const VIDEO_ENDPOINT = `${SERVER_URL}/video` // streams de videos
export const DATA_ENDPOINT = `${SERVER_URL}/data` // información de video/s o creadores
export const BACKGROUND_ENDPOINT = `${SERVER_URL}/background`
export const THUMBNAIL_ENDPOINT = `${SERVER_URL}/poster`
export const ERROR_ENDPOINT = `${SERVER_URL}/error`
export const AVATAR_ENDPOINT = `${SERVER_URL}/avatar`

export const DATA_VIDEO_ENDPOINT = `${DATA_ENDPOINT}/video` // información de un video
