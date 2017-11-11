'use strict'

import db from '../lib/db'
import { Document, Schema } from 'mongoose'
import { TagNotFoundError } from '../lib/errors'

export interface Tag extends Document {
  _id: string,
  title: string,
  color: string
}

export const schema = new Schema({
  _id: String,
  title: String,
  color: String
}, {
  toObject: { versionKey: false },
  toJSON: { versionKey: false }
})

const model = db.model<Tag>('tag', schema)
export default model

export async function validateTags (tags: string[]) {
  for (const tag of tags) {
    const tagDocument = await model.findById(tag)
    if (!tagDocument) {
      throw new TagNotFoundError(tag)
    }
  }
}

export async function ensureBasicTags () {
  const basicTags = [
    { _id: 'ignored', title: '已忽略', color: '#424242' },
    { _id: 'passed', title: '已完成', color: '#4CAF50' },
    { _id: 'updated', title: '有更新', color: '#FFC107' }
  ]

  for (const tag of basicTags) {
    const doc = await model.findById(tag._id)
    if (!doc) {
      await new model(tag).save()
    }
  }
}
