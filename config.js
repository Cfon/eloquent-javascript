'use strict'

const path = require('path')

module.exports = {
  db: {
    name: 'eloquent-javascript',
    uri: 'mongodb://localhost'
  },
  logs: path.join(__dirname, 'logs'),
  port: 3000,
  secret: '',
  workDir: path.join(__dirname, '../eloquent-javascript'),
}
