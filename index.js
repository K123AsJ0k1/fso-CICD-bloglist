const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.TEST_PORT, () => {
  logger.info(`Server running on test port ${config.TEST_PORT}`)
})
