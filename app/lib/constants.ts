const SERVER_URL = import.meta.env.VITE_SERVER_URL
export const VIDEO_ENDPOINT = `${SERVER_URL}/video` // de acá se trae el video, el stream de datos
export const DATA_ENDPOINT = `${SERVER_URL}/data` // endpoint de información, ej: info de un video o creador
export const BACKGROUND_ENDPOINT = `${SERVER_URL}/background`
export const THUMBNAIL_ENDPOINT = `${SERVER_URL}/poster`
export const ERROR_ENDPOINT = `${SERVER_URL}/error`

export const DATA_VIDEO_ENDPOINT = `${DATA_ENDPOINT}/video` // endpoint de información, ej: info de un video o creador
