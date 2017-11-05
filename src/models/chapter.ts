'use strict'

import db from '../lib/db'
import parse from '../processor/parser'
import * as fs from 'mz/fs'
import Paragraph from '../processor/paragraph'
import { Document, Model, Schema } from 'mongoose'

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

interface ChapterMethods {
  /** Export chapter to file */
  export (this: Chapter): Promise<void>,

  /** Synchronize chapter from file */
  sync (this: Chapter): Promise<Chapter>
}

interface ChapterModel extends Model<Chapter>, ChapterMethods {}

schema.methods = {
  export () {
    return fs.writeFile(this.file, Paragraph.generateSource(this.paragraphs))
  },
  async sync () {
    const input = await fs.readFile(this.file, 'utf8')
    this.paragraphs = parse(input)
    return this.save()
  }
} as ChapterMethods

export default db.model<Chapter, ChapterModel>('chapter', schema)
