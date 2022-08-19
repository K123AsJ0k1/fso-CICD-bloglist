const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const path = require('path')
const blogsRouter = require('./controllers/blogs')
const usersRouters = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
// eslint-disable-next-line no-undef
//app.use(express.static('build'))
// eslint-disable-next-line no-undef
app.use(express.static(path.resolve(__dirname,'./frontend/build')))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouters)
app.use('/api/login', loginRouter)

app.get('/api/health', (req, res) => {
  res.send('ok')
})

app.get('/api/version', (req, res) => {
  res.send('1') // change this string to ensure a new version deployed
})

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'test') {
  console.log('test')
  app.use(express.static('build'))
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3000, () => {
    console.log('server started on port 3000')
  })
}

module.exports = app