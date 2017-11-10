'use strict'

import './lib/db'
import router from './routes'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

import ApiResponserMiddleware from './lib/middlewares/api-responser'
import LoggerMiddleware from './lib/middlewares/logger'

// koa-rewrite 没有 d.ts 定义, 只能这样引入
const rewrite = require('koa-rewrite')

const app = new Koa()
app.use(LoggerMiddleware)
app.use(bodyParser())
app.use(rewrite(`/eloquent-javascript/translator/(.*)`, '/$1'))
app.use(ApiResponserMiddleware)
app.use(router.prefix('/api').routes())

export default app
