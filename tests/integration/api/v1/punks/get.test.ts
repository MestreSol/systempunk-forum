test('get punk by id', async () => {
  const response = await fetch('http://localhost:3000/api/v1/punks?id=1', {
    method: 'GET'
  })
  const punk = await response.json()
  expect(punk.id).toEqual(1)
})

test('get all punks', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/punks', {
      method: 'GET'
    })
    expect(response.status).toBe(200)
  } catch (error) {
    console.error('Fetch failed:', error)
  }
})
