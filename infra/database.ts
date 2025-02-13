import { Client } from 'pg'

async function query(query: string) {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432
  })
  await client.connect()
  const res = await client.query(query)
  await client.end()
  return res
}

export default { query: query }
