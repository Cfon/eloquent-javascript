'use strict'

import app from './app'
import * as fs from 'fs'
import * as http from 'http'
import logger from './lib/logger'

const config = require('../config')
const port = Number.parseInt(process.env.PORT || config.port || '3000')
let server: http.Server

// 确保错误日志通过 logger 输出，并结束进程
function fatalErrorHandler (message: string) {
  return (err: Error) => {
    logger.fatal(message + ':')
    logger.fatal(err as any)
    server.close(() => process.exit(1))
    setTimeout(() => process.exit(1), 1000)
  }
}

async function main () {
  server = http.createServer(app.callback())
  server.on('listening', () => logger.info(`Server started at port ${port}`))
  server.on('error', fatalErrorHandler('HTTP 服务器错误'))
  server.listen(port)
}

process.on('uncaughtException', fatalErrorHandler('发生未处理的异常'))
process.on('unhandledRejection', fatalErrorHandler('发生未处理的 Promise rejection'))
