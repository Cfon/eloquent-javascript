'use strict'

import db from '../lib/db'
import Paragraph from '../processor/paragraph'
import { Document, Schema } from 'mongoose'

export interface Chapter extends Document {
  _id: number,
  file: string,
  title: string,
  paragraphs: Paragraph[]
}

export const paragraphSchema = new Schema({
  _id: false as any,
  source: {
    type: String,
    default: ''
  },
  translation: {
    type: String,
    default: ''
  },
  meta: {
    type: Object,
    default: () => ({})
  }
}).loadClass(Paragraph)

export const schema = new Schema({
  _id: Number,
  file: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  paragraphs: {
    type: [paragraphSchema],
    default: () => ([])
  }
}, {
  toJSON: { versionKey: false }
})

export default db.model<Chapter>('chapter', schema)
