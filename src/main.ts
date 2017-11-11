'use strict'

import app from './app'
import logger from './lib/logger'
import * as fs from 'fs'
import * as git from './processor/git'
import * as http from 'http'
import * as meta from './models/meta'
import { scheduleJob } from 'node-schedule'
import { ensureBasicTags } from './models/tag'

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

// 规划任务的同时执行一次任务
function schedule (rule: string, job: () => any) {
  setTimeout(job, 0)
  return scheduleJob(rule, job)
}

async function main () {
  server = http.createServer(app.callback())
  server.on('listening', () => logger.info(`Server started at port ${port}`))
  server.on('error', fatalErrorHandler('HTTP 服务器错误'))

  // 确保数据库中存有下面这些最基本的标签
  await ensureBasicTags()

  // 每 30 分钟获取一次 git 仓库更新
  schedule('*/30 * * * *', async () => {
    await git.fetch()
    await meta.set('origin', await git.remoteChanges())
  })

  server.listen(port)
}

process.on('uncaughtException', fatalErrorHandler('发生未处理的异常'))
process.on('unhandledRejection', fatalErrorHandler('发生未处理的 Promise rejection'))

main()
