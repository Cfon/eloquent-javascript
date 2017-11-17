'use strict'

import Chapter from '../models/chapter'
import validate from '../lib/middlewares/validate'
import * as git from '../processor/git'
import * as meta from '../models/meta'
import * as Router from 'koa-router'
import { raw, required } from '../lib/ajv'

const router = new Router()

router.get('origin',
  async (ctx, next) => {
    ctx.result = await meta.get('origin')
  }
)

// Commit and push
router.patch('origin',
  validate({
    chapters: required(raw({
      type: 'array',
      items: { type: 'integer' },
      minItems: 1
    })),
    message: required(raw({
      type: 'string',
      minLength: 1
    }))
  }),
  async (ctx, next) => {
    const { chapters: chaptersToCommit, message } = ctx.request.body
    const chapters = await Chapter.find({ _id: { $in: chaptersToCommit } })

    let count = 0
    for (const chapter of chapters) {
      if (await chapter.commit(message)) {
        await chapter.export()
        await git.add(chapter.file)
        count++
      }
    }

    if (count) {
      await git.commit(message)
      await git.push()
    }

    ctx.result = null
  }
)

// Pull
router.patch('local',
  validate({
    message: required(raw({
      type: 'string',
      minLength: 1
    }))
  }),
  async (ctx, next) => {
    await git.merge(ctx.request.body.message)
    await meta.set('origin', await git.remoteChanges())
    ctx.result = null
  }
)

export default router
