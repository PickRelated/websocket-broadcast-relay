const { socketHistory } = require('./socket')

const init = (app) => {
  app.get('/history', (req, res) => {
    const { id } = req.query
    res.send(socketHistory[id] || [])
  })
}

module.exports = {
  init,
}
