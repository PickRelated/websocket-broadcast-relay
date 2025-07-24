const { Server } = require('socket.io')
const moment = require('moment')

const socketHistory = {
  events: [],
}

setInterval(() => {
  socketHistory.events = socketHistory.events.filter(({ time }) => moment().diff(time, 'seconds') <= 120)
}, 5000)

const attach = (httpServer) => {
  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.info(`Connection from client ${socket.id}`)

    socket.onAny((event, payload) => {
      console.info(`${socket.id} sent event ${event} with payload ${JSON.stringify(payload)}`)
      socketHistory.events.push({ time: moment().toISOString(), socketId: socket.id, event, payload })
      socket.broadcast.emit(event, payload)
    })
  })
}

module.exports = {
  socketHistory,
  attach,
}
