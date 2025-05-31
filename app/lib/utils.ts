import { Temporal } from 'temporal-polyfill'

export function title(t?: string) {
  return t ? `${t} - YouTube` : 'YouTube'
}

export function parseDuration (duration: number) {
  if (duration > 3605979) {
    return '999:99:99+'
  } else if (duration > 3605939) {
    duration = duration - 3605940
    return `999:99:${`${duration + 60}`.padStart(2, '0')}`
  } else if (duration > 3599999) {
    duration = duration - 3600000
    return `999:${`${Math.floor((duration + 60) / 60)}`.padStart(1, '0')}:${`${(duration % 60)}`.padStart(2, '0')}`
  }
  const hh = duration > 3600 ? `${Math.floor(duration / 3600)}` : 0
  const mm = `${Math.floor((duration - (3600 * Number(hh))) / 60)}`.padStart(1, '0')
  const ss = `${Math.floor(duration % 60)}`.padStart(2, '0')
  return `${hh ? `${hh}:` : ''}${hh ? mm.padStart(2,'0') : mm}:${ss}`
}

export function parseViews (views: number) {
  let parsedViews = `${views ?? 0}`
  let multiplo = ''
  let v = `${views}`

  if (v.length < 4) {
    multiplo = ''
  } else if (v.length < 7) {
    multiplo = ' k'
    views /= 1000
  } else if (v.length < 10) {
    multiplo = ' M'
    views /= 1000000
  } else {
    multiplo = ' B'
    views /= 1000000000
  }
  v = `${views}`
  if (views < 10) {
    parsedViews = (v.includes('.') && !v.includes('.0'))
      ? `${views.toString().substring(0, 3)}${multiplo}`
      : `${views.toFixed(0)}${multiplo}`
  } else if (views < 100) {
    parsedViews = `${views.toString().substring(0, 2)}${multiplo}`
  } else {
    parsedViews = `${views.toString().substring(0, 3)}${multiplo}`
  }

  return parsedViews
}

export function parsePublicationDate (publicationDate: string) {
  const instant = Temporal.Instant.from(publicationDate)
  const now = Temporal.Now.instant()
  const dif = now.since(instant).seconds

  // Para que no tengas que leer de abajo, esto se encarga de mostrar hace cuánto se publicó el video: años, meses, etc
  if (dif >= 31536000) return `${Math.floor(dif / 31536000)} ${Math.floor(dif / 31536000) === 1 ? 'año' : 'años'}`
  else if (dif >= 2678400) return `${Math.floor(dif / 2678400)} ${Math.floor(dif / 2678400) === 1 ? 'mes' : 'meses'}`
  else if (dif >= 604800) return `${Math.floor(dif / 604800)} ${Math.floor(dif / 604800) === 1 ? 'semana' : 'semanas'}`
  else if (dif >= 86400) return `${Math.floor(dif / 86400)} ${Math.floor(dif / 86400) === 1 ? 'día' : 'días'}`
  else if (dif >= 3600) return `${Math.floor(dif / 3600)} ${Math.floor(dif / 3600) === 1 ? 'hora' : 'horas'}`
  else if (dif >= 60) return `${Math.floor(dif / 60)} ${Math.floor(dif / 60) === 1 ? 'minuto' : 'minutos'}`
  else return `${dif} ${dif === 1 ? 'segundo' : 'segundos'}`
}

export function getAvatar (id: string = '') {
  return `${AVATAR_ENDPOINT}/${id}`
}

export function getThumbnail (id: string = '') {
  return `${THUMBNAIL_ENDPOINT}/${id}`
}
