'use strict'

import * as git from '../processor/git'
import * as meta from '../models/meta'
import * as Router from 'koa-router'

const router = new Router()

router.get('git/commits-behind',
  async (ctx, next) => {
    ctx.result = await meta.get('commits-behind')
  }
)

export default router
