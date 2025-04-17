import type { User } from '@/env'
import { v4 as uuidv4 } from 'uuid'

export const user: User = {
  id: uuidv4(),
  name: 'Usuario de pruebas',
  type: 'user',
  videosVistos: [
    {
      videoId: 'VOChndxKi6U',
      timeSeen: 20
    }
  ],
  preferedQuality: '360p'
}
