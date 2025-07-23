const { Server } = require('socket.io')

const PORT = 3333

const io = new Server(PORT)

io.on('connection', (socket) => {
  console.info(`Connection from client ${socket.id}`)

  socket.onAny((event, data) => {
    console.info(`${socket.id} sent event ${event} with payload ${JSON.stringify(data)}`)
    socket.broadcast.emit(event, data)
  })
})

console.info(`Server is listening on port ${PORT}`)
