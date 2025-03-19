import { createClient } from '@libsql/client'

const url = import.meta.env.VITE_DB_URL
const authToken = import.meta.env.VITE_DB_AUTH_TOKEN

export const db = createClient({ url, authToken })

