import { Client } from 'pg'

async function query(query: string) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10)
  })
  await client.connect()
  const res = await client.query(query)
  await client.end()
  return res
}

export default { query: query }
