'use strict'

import Chapter from '../models/chapter'
import validate from '../lib/middlewares/validate'
import * as git from '../processor/git'
import * as meta from '../models/meta'
import * as Router from 'koa-router'
import { required } from '../lib/ajv'

const router = new Router()

router.get('commits-behind',
  async (ctx, next) => {
    ctx.result = await meta.get('commits-behind')
  }
)

// Commit and push
router.patch('origin',
  validate({
    message: required('string')
  }),
  async (ctx, next) => {
    const { message } = ctx.request.body
    const chapters = await Chapter.find({})

    for (const chapter of chapters) {
      if (await chapter.commit(message)) {
        await chapter.export()
      }
    }

    await git.commitAll(message)
    await git.push()
    ctx.result = null
  }
)

router.patch('local',
  validate({
    message: required('string')
  }),
  async (ctx, next) => {
    await git.fetch()
    await git.mergeRemote(ctx.request.body.message)
    ctx.result = null
  }
)

export default router
