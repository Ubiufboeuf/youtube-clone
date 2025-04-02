import type { Creator, Video } from './env'

export const videos: Video[] = [
  {
    id: '35nV_M3asRs',
    duration: 241,
    timeSeen: 0,
    creatorId: 'ooo0eve0ooo',
    title: 'インソムニア (INSOMNIA) - Eve Music Video',
    views: 13610469,
    publicationDateTime: '2024-06-09T12:00:00Z',
    posters: ['hqdefault', 'hq720'],
    availableOptions: ['audio_only', '720p'],
    selectedOption: 'audio_only',
    description: 'aasdasdasd'
  },
  {
    id: 'VOChndxKi6U',
    duration: 216,
    timeSeen: 0,
    creatorId: 'ooo0eve0ooo',
    title: 'さよならエンドロール - Eve MV',
    views: 3855773,
    publicationDateTime: '2024-12-24T12:00:00Z',
    posters: ['hqdefault', 'hq720'],
    availableOptions: ['audio_only', '720p', '2160p'],
    selectedOption: '720p',
    description: 'aasdasdasd'
  },
  {
    id: 'h9iYg1-N5BU',
    duration: 2197,
    timeSeen: 0,
    creatorId: '',
    title: 'Persona 3 Reload All Vocal Music',
    views: 527717,
    publicationDateTime: '2024-02-02T12:00:00Z',
    posters: ['hq720'],
    availableOptions: ['audio_only'],
    selectedOption: 'audio_only',
    description: ''
  },
  {
    id: '6dHyQSQ2YHM',
    duration: 10955,
    timeSeen: 0,
    creatorId: '',
    title: '3 Hours of Chill Pokémon Music',
    views: 254891,
    publicationDateTime: '2024-03-20T12:00:00Z',
    posters: [''],
    availableOptions: ['audio_only'],
    selectedOption: 'audio_only',
    description: ''
  }
  // {
  //   id: '',
  //   duration: 0,
  //   timeSeen: 0,
  //   creatorId: '',
  //   title: '',
  //   views: 0,
  //   publicationDate: '',
  //   poster: '',
  //   sources: {
  //     '': ''
  //   },
  //   availableOptions: [''],
  //   description: ''
  // },
]

export const creators: Creator[] = [
  {
    id: 'ooo0eve0ooo',
    name: 'eve',
    verified: true,
    description: 'Eve - OFFICIAL CHANNEL',
    links: [
      { name: 'Twitter', link: 'twitter.com/oO0Eve0Oo' },
      { name: 'HP', link: 'eveofficial.com' },
      { name: 'Instagram', link: 'instagram.com/eve_harapeco' },
      { name: 'TikTok', link: 'tiktok.com/@nonsense_eye' }
    ],
    details: {
      channelURL: 'www.youtube.com/@ooo0eve0ooo',
      country: 'Japón',
      joined: '10 de noviembre de 2013',
      subscriptions: 5230000,
      videosCount: 141,
      views: 2947861901
    }
  },
  {
    id: 'midulive',
    name: 'midulive',
    verified: true,
    description: 'Streamings sobre Desarrollo FullStack con JavaScript de midudev en Twitch. Directos completos y extracto de los mejores momentos.',
    links: [
      { name: 'CANAL PRINCIPAL', link: 'youtube.com/c/midudev?sub_confirmation=1' },
      { name: 'Twitch', link: 'twitch.tv/midudev' },
      { name: 'Instagram', link: 'instagram.com/midu.dev' },
      { name: 'Twitter', link: 'twitter.com/midudev' }
    ],
    details: {
      channelURL: 'www.youtube.com/@midulive',
      country: 'España',
      joined: '6 de enero de 2021',
      subscriptions: 391000,
      videosCount: 1163,
      views: 74284361
    }
  }
  // {
  //   id: '',
  //   name: '',
  //   verified: false,
  //   description: '',
  //   links: [
  //     { name: '', link: '' },
  //     { name: '', link: '' },
  //     { name: '', link: '' },
  //     { name: '', link: '' }
  //   ],
  //   details: {
  //     channelURL: '',
  //     country: '',
  //     joined: '',
  //     subscriptions: 0,
  //     videosCount: 0,
  //     views: 0
  //   }
  // },
]
