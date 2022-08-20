/* eslint-disable no-undef */
require('dotenv').config()

//let APP_PORT = process.env.APP_PORT || 3000

//APP_PORT

const MONGODB_URI = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'e2e')
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI
}