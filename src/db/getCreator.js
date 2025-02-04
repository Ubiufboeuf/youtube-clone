import { db } from './client'

export async function getCreator (id) {
  const { rows } = await db.execute({
    sql: 'SELECT * FROM creator WHERE id = ?',
    args: [id]
  })
  console.log(id)
  const creator = {
    id: rows[0].id.toString(),
    name: rows[0].name.toString(),
    creationDate: rows[0].creationDate.toString(),
    verified: Number(rows[0].verified)
  }
  return creator
}
