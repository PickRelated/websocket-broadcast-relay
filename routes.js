const { socketHistory } = require('./socket')

const init = (app) => {
  app.get('/history', (req, res) => {
    res.send(socketHistory.events)
  })
}

module.exports = {
  init,
}
