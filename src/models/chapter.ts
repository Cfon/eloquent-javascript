'use strict'

import db from '../lib/db'
import parse from '../processor/parser'
import * as fs from 'mz/fs'
import Paragraph from '../processor/paragraph'
import { Document, Model, Schema } from 'mongoose'

interface ChapterMethods {
  export (this: Chapter): Promise<void>,
  updateParagraphs (this: Chapter, paragraphs: Paragraph[]): Promise<Chapter>
}

export interface Chapter extends Document, ChapterMethods {
  _id: number,
  file: string,
  title: string,
  lastEdit: Date,
  paragraphs: Paragraph[]
}

export const paragraphSchema = new Schema({
  _id: false as any,
  source: {
    type: String,
    default: ''
  },
  sourceVersions: {
    type: [{
      _id: false,
      content: String,
      date: Date
    }],
    default: () => []
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
  lastEdit: {
    type: Date,
    default: () => new Date()
  },
  paragraphs: {
    type: [paragraphSchema],
    default: () => ([])
  }
}, {
  toJSON: { versionKey: false }
})

schema.methods = {
  export () {
    return fs.writeFile(this.file, Paragraph.generateSource(this.paragraphs))
  },
  async updateParagraphs (paragraphs) {
    for (const paragraph of paragraphs) {
      const oldParagraph = this.paragraphs.find(p => p.id === paragraph.id)
      if (oldParagraph) {
        paragraph.meta = oldParagraph.meta
        paragraph.sourceVersions = oldParagraph.sourceVersions || []

        // record source content changes
        if (paragraph.source.replace(/\n/g, ' ') !== oldParagraph.source.replace(/\n/g, ' ')) {
          paragraph.sourceVersions.push({
            content: oldParagraph.source,
            date: new Date()
          })
        }
      }
    }

    this.lastEdit = new Date()
    this.paragraphs = paragraphs
    return this.save()
  }
} as ChapterMethods

export default db.model<Chapter>('chapter', schema)
