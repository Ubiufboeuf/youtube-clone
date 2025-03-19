import type { Creator, Media } from '@/env'
import { creators, media } from '@/mocks'
// import type { Row } from '@libsql/client'

// async function createMediaByRow (row: Row): Promise<Media> {
// //   return {
// //     id: row?.id?.toString() ?? '',
// //     duration: Number(row?.duration),
// //     timeSeen: Number(row?.timeSeen),
// //     creatorId: '',
// //     title: row?.title?.toString() ?? '',
// //     views: Number(row?.views),
// //     publicationDate: row?.publicationDate?.toString() ?? '',
// //     poster: row?.mediaPoster?.toString() ?? '',
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

export async function getAllMedias () {
  // const { rows } = await db.execute('SELECT * FROM media')
  // const medias: Media[] = []
  // rows.forEach(async (row) => {
  //   medias.push(await createMediaByRow(row))
  // })
  // return medias
  return media
}

export async function getMediaById (id: string): Promise<Media> {
  // const row = (await db.execute({
  //   sql: 'SELECT * FROM media WHERE id = ?',
  //   args: [id]
  // })).rows[0]

  // return await createMediaByRow(row)
  return media.find(m => m.id === id) ?? media[0]
}

export async function getCreatorById (id: string): Promise<Creator | undefined> {
  // const row = (await db.execute({
  //   sql: 'SELECT * FROM creator WHERE id = ?',
  //   args: [id]
  // })).rows[0]

  // return await createCreatorByRow(row)
  return creators.find(c => c.id === id)
}
