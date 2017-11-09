'use strict'

import logger from '../logger'
import { Middleware } from 'koa'
import { dumpHttpRequest } from '../util'
import { makeErrorResponse } from './api-responser'

/** 判定为较慢响应的毫秒数 */
const SLOW_RESPONSE = 500

export default (async function LoggerMiddleware (ctx, next) {
  let error: any
  let messages: any[] = []
  let logLevel = 'info'

  const start = Date.now()
  await next().catch(err => { error = err })    // 捕获异常并计算响应时间
  const time = Date.now() - start

  if (error != null) {
    logLevel = 'error'
    messages.push(error)

    // 如果上层路由抛错且没有设置响应内容, 则使用默认响应内容
    if (ctx.body == null) {
      makeErrorResponse(ctx, error)
    }
  } else if (time >= SLOW_RESPONSE) {
    logLevel = 'warn'
  }

  // 如果出错, 记录完整的HTTP请求
  if (logLevel === 'error') {
    messages.push('HTTP request dump:\n' + dumpHttpRequest(ctx))
  }

  (logger as any)[logLevel](
    ctx.method.toUpperCase(),
    ctx.originalUrl,
    '-',
    ctx.status,
    time + 'ms',
    '-',
    ctx.headers['user-agent'] || '[No User-Agent]'
  )

  messages.forEach(message => (logger as any)[logLevel](message.toString()))
}) as Middleware
