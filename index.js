const PORT = 3333

const http = require('http')
const express = require('express')

const routes = require('./routes')
const socket = require('./socket')

const app = express()
const httpServer = http.createServer(app)

httpServer.listen(PORT, async () => {
  await socket.attach(httpServer)
  routes.init(app)
  console.info(`Server is listening on port ${PORT}`)
})
