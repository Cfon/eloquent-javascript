'use strict'

import db from '../lib/db'
import parse from '../processor/parser'
import * as fs from 'mz/fs'
import { Document, Model, Schema } from 'mongoose'
import Paragraph, { paragraphSchema } from '../processor/paragraph'

interface ChapterMethods {
  export (this: Chapter): Promise<void>,
  updateParagraphs (this: Chapter, paragraphs: Paragraph[]): Promise<Chapter>
}

export interface Chapter extends Document, ChapterMethods {
  _id: number,
  file: string,
  title: string,
  updated: Date,
  paragraphs: Paragraph[]
}

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
  updated: {
    type: Date,
    default: () => new Date()
  },
  paragraphs: {
    type: [paragraphSchema],
    default: () => ([])
  }
}, {
  toObject: { versionKey: false },
  toJSON: { versionKey: false }
})

schema.methods = {
  export () {
    return fs.writeFile(this.file, Paragraph.generateSource(this.paragraphs))
  },
  async updateParagraphs (paragraphs) {
    for (const paragraph of paragraphs) {
      const oldParagraph = this.paragraphs.find(p => p._id === paragraph._id)
      if (oldParagraph) {
        // update paragraph from oldParagraph except source and translation
        Object.assign(paragraph, oldParagraph, {
          source: paragraph.source,
          translation: paragraph.translation
        })

        // record source content changes
        if (paragraph.source.replace(/\n/g, ' ') !== oldParagraph.source.replace(/\n/g, ' ')) {
          paragraph.updated = new Date()
          paragraph.sourceVersions.push({
            content: oldParagraph.source,
            date: new Date()
          })
        }
      }
    }

    this.updated = new Date()
    this.paragraphs = paragraphs
    return this.save()
  }
} as ChapterMethods

export default db.model<Chapter>('chapter', schema)
