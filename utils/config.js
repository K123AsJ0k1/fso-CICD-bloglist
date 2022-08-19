/* eslint-disable no-undef */
require('dotenv').config()

let BACK_PORT = process.env.BACK_PORT || 3003

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  BACK_PORT
}