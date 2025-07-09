test('Get to /api/v1/status/global should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status/database')
  expect(response.status).toBe(200)

  const responseBody = await response.json()
  expect(responseBody.status).toBeDefined()

  const { update_at } = responseBody.status
  console.log('update_at', update_at)
  expect(update_at).toBeDefined()
  console.log('update_at instanceof Date', new Date(update_at))
  expect(new Date(update_at)).toBeInstanceOf(Date)
  console.log('new Date(update_at).getTime()', new Date(update_at).getTime())
  expect(new Date(update_at).getTime()).toBeLessThanOrEqual(
    new Date().getTime()
  )
  expect(new Date(update_at).getTime()).toBeGreaterThan(
    new Date().getTime() - 1000
  )
})
