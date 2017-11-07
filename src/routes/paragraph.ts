'use strict'

import Chapter from '../models/chapter'
import * as Router from 'koa-router'
import { NotFoundError, ValidationFailureError } from '../lib/errors'

const router = new Router()
const PAGE_SIZE = 10

router.get('chapter/:id/paragraphs/:page',
  async (ctx, next) => {
    const _id = Number(ctx.params.id)
    const page = Number(ctx.params.page)

    if (Number.isNaN(_id)) throw new ValidationFailureError('id 必须是一个数字')
    if (Number.isNaN(page)) throw new ValidationFailureError('页码必须是一个数字')
    if (page < 1) throw new ValidationFailureError('页码必须大于等于 1')

    const result = await Chapter.aggregate([
      { $match: { _id } },
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

    if (result.length === 0) throw new NotFoundError(`没有 id 为 ${_id} 的章节`)
    ctx.result = result[0]
  }
)

router.get('chapter/:id/paragraph/:pid',
  async (ctx, next) => {
    const _id = Number(ctx.params.id)
    const { pid } = ctx.params

    if (Number.isNaN(_id)) throw new ValidationFailureError('id 必须是一个数字')

    const result: any = await Chapter.aggregate([
      { $match: { _id } },
      { $project: {
        paragraphs: { $filter: { input: '$paragraphs', as: 'paragraph', cond: {
          $eq: ['$$paragraph._id', pid]
        } } }
      } },
      { $project: { data: { $arrayElemAt: ['$paragraphs', 0] } } }
    ])

    if (result[0] == null) throw new NotFoundError(`没有 id 为 ${_id} 的章节`)
    if (result[0].data == null) throw new NotFoundError(`在第 ${_id} 章中没有 id 为 ${pid} 的段落`)

    ctx.result = result[0].data
  }
)

export default router
