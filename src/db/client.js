import { createClient } from '@libsql/client'

const url = import.meta.env.PUBLIC_URL
const authToken = import.meta.env.PUBLIC_TOKEN

export const db = createClient({ url, authToken })
