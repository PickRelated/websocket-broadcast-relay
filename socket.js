const { Server } = require('socket.io')
const moment = require('moment')

const socketHistory = {}

setInterval(() => {
  for (const id in socketHistory) {
    socketHistory[id] = socketHistory[id] || []
    socketHistory[id] = socketHistory[id].filter(({ time }) => moment().diff(time, 'seconds') <= 120)
  }
}, 5000)

const attach = (httpServer) => {
  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    const { id } = socket.handshake.query
    console.info(`Connection from ${id}`)

    socket.join(id)

    socket.onAny((event, payload) => {
      console.info(`${id} [${event}]: ${JSON.stringify(payload)}`)
      socketHistory[id] = socketHistory[id] || []
      socketHistory[id].push({ time: moment().toISOString(), event, payload })
      socket.to(id).emit(event, payload)
    })
  })
}

module.exports = {
  socketHistory,
  attach,
}
