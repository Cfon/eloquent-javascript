'use strict'

import Tag from '../models/tag'
import validate from '../lib/middlewares/validate'
import * as Router from 'koa-router'
import { AuthMiddleware } from '../lib/middlewares/auth'

const router = new Router()

router.get('tags',
  async (ctx, next) => {
    ctx.result = await Tag.find({})
  }
)

router.put('tags',
  AuthMiddleware,
  validate({
    title: 'string',
    color: 'string'
  }),
  async (ctx, next) => {
    const doc = await new Tag(ctx.request.body).save()
    ctx.result = doc._id
  }
)

router.patch('tag/:id',
  AuthMiddleware,
  validate({
    title: 'string',
    color: 'string'
  }),
  async (ctx, next) => {
    await Tag.findByIdAndUpdate(ctx.params.id, { $set: ctx.request.body })
    ctx.result = null
  }
)

router.delete('tag/:id',
  AuthMiddleware,
  async (ctx, next) => {
    await Tag.findByIdAndRemove(ctx.params.id)
    ctx.result = null
  }
)

export default router
