'use strict'

import Chapter from '../models/chapter'
import * as Router from 'koa-router'
import { NotFoundError, ValidationFailureError } from '../lib/errors'

const router = new Router()
const PAGE_SIZE = 10

router.get('chapter/:id/paragraphs/:page',
  async (ctx, next) => {
    const id = Number(ctx.params.id)
    const page = Number(ctx.params.page)

    if (Number.isNaN(id)) throw new ValidationFailureError('id 必须是一个数字')
    if (Number.isNaN(page)) throw new ValidationFailureError('页码必须是一个数字')
    if (page < 1) throw new ValidationFailureError('页码必须大于等于 1')

    const result = await Chapter.aggregate([
      { $match: { _id: id } },
      { $project: { _id: 0 } },
      {
        $project: {
          paragraphs: 1,
          items: { $slice: ['$paragraphs', PAGE_SIZE * (page - 1), PAGE_SIZE] }
        }
      },
      {
        $project: {
          count: { $size: '$paragraphs' },
          items: { $map: { input: '$items', as: 'item', in: {
            _id: '$$item._id',
            index: { $indexOfArray: ['$paragraphs', '$$item'] },
            source: '$$item.source',
            tags: '$$item.tags',
            created: '$$item.created',
            updated: '$$item.updated',
            unsaved: '$$item.unsaved'
          } } }
        }
      }
    ])

    if (result.length === 0) throw new NotFoundError(`没有 id 为 ${id} 的章节`)
    ctx.result = result[0]
  }
)

export default router
