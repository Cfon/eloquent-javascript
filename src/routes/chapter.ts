'use strict'

import Chapter from '../models/chapter'
import * as Router from 'koa-router'

const router = new Router()

router.get('chapters',
  async (ctx, next) => {
    // 只保留章节的段落数
    ctx.result = await Chapter.aggregate([{
      $project: {
        _id: 1,
        title: 1,
        updated: 1,
        paragraphs: { $size: '$paragraphs' },
        passed: { $size: { $filter: { input: '$paragraphs', as: 'p', cond: { $in: ['passed', '$$p.tags'] } } } },
        unsaved: { $size: { $filter: { input: '$paragraphs', as: 'p', cond: { $eq: ['$$p.unsaved', true] } } } }
      }
    }])
  }
)

export default router
