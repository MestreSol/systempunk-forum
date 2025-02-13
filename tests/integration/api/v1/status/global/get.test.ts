test('Get to /api/v1/status/global should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status/global')
  expect(response.status).toBe(200)
})
