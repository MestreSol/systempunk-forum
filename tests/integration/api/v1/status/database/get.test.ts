test('Get to /api/v1/status/global should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status/database')
  const body = await response.json()

  expect(body.dependencies.database.version).toEqual('17.2')
  expect(Number.isInteger(body.dependencies.database.active_connections)).toBe(
    true
  )
  expect(body.dependencies.database.active_connections).toBeGreaterThan(0)
  expect(Number.isInteger(body.dependencies.database.max_connections)).toBe(
    true
  )
  expect(body.dependencies.database.max_connections).toBeGreaterThan(0)
  expect(body.dependencies.database.timezone).toEqual('America/Sao_Paulo')
})
