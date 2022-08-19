const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.BACK_PORT, () => {
  logger.info(`Server running on port ${config.BACK_PORT}`)
})
