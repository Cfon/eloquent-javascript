'use strict'

import db from '../lib/db'
import parse from '../processor/parser'
import * as fs from 'mz/fs'
import { Document, Model, Schema } from 'mongoose'
import Paragraph, { paragraphSchema } from '../processor/paragraph'

interface ChapterMethods {
  /** 提交章节的更改 */
  commit (this: Chapter, message: string): Promise<Boolean>,

  /** 将一个章节的内容写入到文件中 */
  export (this: Chapter): Promise<void>,

  /** 更新章节标题 */
  updateTitle (this: Chapter): string

  /** 更新章节中所有段落的数据（通常伴随着合并提交） */
  updateParagraphs (this: Chapter, paragraphs: Paragraph[], message: string): Promise<Chapter>
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
  async commit (message) {
    let hasUnsaved = false
    for (const paragraph of this.paragraphs) {
      if (paragraph.unsaved) {
        hasUnsaved = true
        paragraph.pushHistory(message)
      }
    }

    if (hasUnsaved) {
      this.updated = new Date()
      await this.save()
    }

    return hasUnsaved
  },
  export () {
    return fs.writeFile(this.file, Paragraph.generateSource(this.paragraphs))
  },
  updateTitle () {
    let title = this.title || ''

    for (const paragraph of this.paragraphs) {
      const content = paragraph.getTranslation()
      if (content.startsWith('# ')) {
        title = content.slice(2)
        break
      }
    }

    this.title = title
    return title
  },
  async updateParagraphs (paragraphs, message) {
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
          // update tags
          let passed: number
          if ((passed = paragraph.tags.indexOf('passed')) !== -1) {
            paragraph.tags.splice(passed, 1)
          }

          if (!paragraph.tags.includes('updated')) {
            paragraph.tags.push('updated')
          }

          // write history
          paragraph.updated = new Date()
          paragraph.history.push({
            source: oldParagraph.source,
            translation: oldParagraph.translation,
            message,
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

const model = db.model<Chapter>('chapter', schema)
export default model

/** 通过 id 获取某个章节的某个段落 */
export async function getParagraph (id: number, pid: string) {
  const chapter = await model.findById(id)
  if (chapter) {
    const paragraph = chapter.paragraphs.find(p => p._id === pid)
    if (paragraph) {
      return { chapter, paragraph }
    }

    return { chapter, paragraph: null }
  }

  return null
}
