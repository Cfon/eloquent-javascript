'use strict'

import * as log4js from 'log4js'
import * as path from 'path'

const config = require('../../config.js')
const meta = require('../../package.json')

log4js.configure({
  appenders: {
    console: { type: 'console' },
    logFile: {
      type: 'dateFile',
      filename: path.join(config.logs, meta.name + '.log')
    },
    errorFile: {
      type: 'dateFile',
      filename: path.join(config.logs, meta.name + '-errors.log')
    },
    logs: {
      type: 'logLevelFilter',
      level: 'ALL',
      maxLevel: 'WARN',
      appender: 'logFile'
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile'
    }
  },
  categories: {
    default: {
      appenders: ['console', 'logs', 'errors'],
      level: 'debug'
    }
  }
})

export default log4js.getLogger()
