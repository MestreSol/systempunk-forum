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

async function information() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10)
  })
  await client.connect()
  const res = await client.query('SELECT * FROM information_schema.tables')
  await client.end()
  return res
}

async function getVersion() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10)
  })
  await client.connect()
  const res = await client.query('SELECT version()')
  await client.end()
  return res.rows[0].version
}

async function getAdditionalInfo() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10)
  })
  await client.connect()
  const res = await client.query(
    'SELECT * FROM pg_stat_database WHERE datname = $1',
    [process.env.POSTGRES_DB]
  )
  await client.end()
  return res.rows[0]
}

async function getConnectionCount() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10)
  })
  await client.connect()
  const res = await client.query(
    'SELECT count(*) FROM pg_stat_activity WHERE datname = $1',
    [process.env.POSTGRES_DB]
  )
  await client.end()
  return res.rows[0].count
}

export default {
  query,
  information,
  getVersion,
  getAdditionalInfo,
  getConnectionCount
}
