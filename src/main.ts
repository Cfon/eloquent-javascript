'use strict'

import app from './app'
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import logger from './lib/logger'

const config = require('../config')
const port = Number.parseInt(process.env.PORT || config.port || '3000')

const server = http.createServer(app.callback())
server.listen(port)
server.on('listening', () => {
  logger.info(`Server started at port ${port}`)
})

// 确保错误日志通过 logger 输出
function fatalErrorHandler (message: string) {
  return (err: Error) => {
    logger.fatal(message + ':')
    logger.fatal(err as any)
    server.close(() => process.exit(1))
  }
}

server.on('error', fatalErrorHandler('Error during server startup'))
process.on('uncaughtException', fatalErrorHandler('Uncaught exception'))
process.on('unhandledRejection', fatalErrorHandler('Unhandled promise rejection'))
