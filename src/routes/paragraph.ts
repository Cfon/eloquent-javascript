'use strict'

import validate from '../lib/middlewares/validate'
import * as Router from 'koa-router'
import { required } from '../lib/ajv'
import { difference } from 'lodash'
import { validateTags } from '../models/tag'
import { AuthMiddleware } from '../lib/middlewares/auth'
import Chapter, { getParagraph } from '../models/chapter'

import {
  ChapterNotFoundError,
  ParagraphNotFoundError,
  ValidationFailureError
} from '../lib/errors'

const router = new Router()
const PAGE_SIZE = 10

router.get('chapter/:chapter/paragraphs/:page',
  async (ctx, next) => {
    const _id = Number(ctx.params.chapter)
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
            translation: '$$item.translation',
            tags: '$$item.tags',
            created: '$$item.created',
            updated: '$$item.updated',
            unsaved: '$$item.unsaved'
          } } }
        }
      }
    ])

    if (result.length === 0) throw new ChapterNotFoundError(_id)
    ctx.result = result[0]
  }
)

router.get('chapter/:chapter/paragraph/:paragraph',
  async (ctx, next) => {
    const _id = Number(ctx.params.chapter)
    const { paragraph } = ctx.params

    if (Number.isNaN(_id)) throw new ValidationFailureError('id 必须是一个数字')

    const result: any = await Chapter.aggregate([
      { $match: { _id } },
      { $project: {
        paragraphs: { $filter: { input: '$paragraphs', as: 'paragraph', cond: {
          $eq: ['$$paragraph._id', paragraph]
        } } }
      } },
      { $project: { data: { $arrayElemAt: ['$paragraphs', 0] } } }
    ])

    if (result[0] == null) throw new ChapterNotFoundError(_id)
    if (result[0].data == null) throw new ParagraphNotFoundError(_id, paragraph)

    ctx.result = result[0].data
  }
)

router.patch('chapter/:chapter/paragraph/:paragraph',
  AuthMiddleware,
  validate({
    translation: 'string',
    tags: ['string']
  }),
  async (ctx, next) => {
    const data = await getParagraph(ctx.params.chapter, ctx.params.paragraph)
    if (data == null) throw new ChapterNotFoundError(ctx.params.chapter)
    if (data.paragraph == null) throw new ParagraphNotFoundError(ctx.params.chapter, ctx.params.paragraph)

    const { chapter, paragraph } = data
    const {
      translation = paragraph.translation,
      tags = paragraph.tags
    } = ctx.request.body
    const unsaved = paragraph.lastHistory ? (
      paragraph.lastHistory.translation !== translation ||
      !difference(paragraph.lastHistory.tags, tags).length
    ) : true

    await validateTags(tags)

    Object.assign(paragraph, {
      tags,
      unsaved,
      translation,
      updated: new Date()
    })

    chapter.updateTitle()
    await chapter.save()
    ctx.result = null
  }
)

export default router
