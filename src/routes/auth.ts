'use strict'

import * as Router from 'koa-router'
import { AuthMiddleware } from '../lib/middlewares/auth'

const router = new Router()

// 测试 token 是否有效
router.get('echo',
  AuthMiddleware,
  ctx => { ctx.result = null }
)

export default router
