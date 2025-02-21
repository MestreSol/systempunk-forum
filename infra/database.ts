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
  try {
    const res = await client.query(query)
    return res
  } catch (e) {
    console.log(e)
  } finally {
    await client.end()
  }
}

async function heartbeat() {
  return query('SELECT 1')
}

async function getServerVersion() {
  const res = await query('SHOW server_version')
  if (res) {
    return res.rows[0].server_version
  }
  throw new Error('Query failed')
}

async function getAllInformation() {
  const res = await query('SELECT * FROM pg_stat_activity')
  if (res) {
    return res.rows
  }
  throw new Error('Query failed')
}

async function getActiveConnections() {
  const res = await query('SELECT count(*) FROM pg_stat_activity')
  if (res) {
    return res.rows[0].count
  }
  throw new Error('Query failed')
}

async function getMaxConnections() {
  const res = await query('SHOW max_connections')
  if (res) {
    return res.rows[0].max_connections
  }
  throw new Error('Query failed')
}

async function getTimezone() {
  const res = await query('SHOW timezone')
  if (res) {
    console.log(res.rows[0])
    return res.rows[0].TimeZone
  }
  throw new Error('Query failed')
}

export default {
  query: query,
  heartbeat: heartbeat,
  getServerVersion: getServerVersion,
  getAllInformation: getAllInformation,
  getActiveConnections: getActiveConnections,
  getMaxConnections: getMaxConnections,
  getTimezone: getTimezone
}
