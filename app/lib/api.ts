import type { Creator, Video } from '@/env'
import { creators, videos } from '@/mocks'
export const serverURL = 'http://192.168.1.4:1234'
// import type { Row } from '@libsql/client'

// async function createVideoByRow (row: Row): Promise<Video> {
// //   return {
// //     id: row?.id?.toString() ?? '',
// //     duration: Number(row?.duration),
// //     timeSeen: Number(row?.timeSeen),
// //     creatorId: '',
// //     title: row?.title?.toString() ?? '',
// //     views: Number(row?.views),
// //     publicationDate: row?.publicationDateTime?.toString() ?? '',
// //     poster: row?.videoPoster?.toString() ?? '',
// //     sources: {
      
// //     },
// //     description: ''
// //   }
// // }

// async function createCreatorByRow (row: Row): Promise<Creator> {
//   return {
//     id: row.id?.toString() ?? '',
//     creationDate: row.creationDate?.toString() ?? '',
//     creatorAvatar: row.creatorAvatar?.toString() ?? '',
//     name: row.name?.toString() ?? '',
//     verified: Boolean(row.verified)
//   }
// }

export async function getAllVideos () {
  // const { rows } = await db.execute('SELECT * FROM video')
  // const videos: Video[] = []
  // rows.forEach(async (row) => {
  //   videos.push(await createVideoByRow(row))
  // })
  // return videos
  return videos
}

export async function getVideoById (id: string): Promise<Video | undefined> {
  // const row = (await db.execute({
  //   sql: 'SELECT * FROM video WHERE id = ?',
  //   args: [id]
  // })).rows[0]

  // return await createVideoByRow(row)
  return videos.find(m => m.id === id)
}

export async function getCreatorById (id: string): Promise<Creator | undefined> {
  // const row = (await db.execute({
  //   sql: 'SELECT * FROM creator WHERE id = ?',
  //   args: [id]
  // })).rows[0]

  // return await createCreatorByRow(row)
  return creators.find(c => c.id === id)
}
