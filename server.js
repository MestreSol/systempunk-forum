// filepath: /e:/systempunk-forum/server.js
const jsonServer = require('json-server')
const cors = require('cors')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(middlewares)
server.use(router)
server.listen(5000, () => {
  console.log('JSON Server is running on port 5000')
})
