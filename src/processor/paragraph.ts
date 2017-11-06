'use strict'

import { Schema, SchemaTypes } from 'mongoose'
import { sha1, parseJSON, randomString } from '../lib/util'

export interface ParagraphVersion {
  content: string,
  date: Date
}

export default class Paragraph {
  /** The id of a paragraph */
  _id: string

  /** The original text of the paragraph */
  source: string

  /** The versions of the source content. */
  sourceVersions: ParagraphVersion[] = []

  /** The translation of the paragraph */
  translation: string

  tags: string[]
  created: Date
  updated: Date

  constructor (input: string) {
    // parse translation and meta by line
    const result: { [key: string]: string[] } = {
      source: [],
      translation: []
    }

    let state = 'source'
    input.split('\n').forEach(content => {
      if (content[0] === '@') {
        if (content[1] === '!' && !this._id) {
          if (!this._id) {
            this._id = content.slice(2)
            return
          } else {
            throw new SyntaxError('A paragraph cannot have multiple ids:\n' + input)
          }
        } else if (state === 'source') {
          state = 'translation'
        }

        // remove '@'
        content = content.slice(1)
      } else if (state === 'translation') {
        throw new SyntaxError('Mixed source and translation:\n' + input)
      }

      result[state].push(content)
    })

    this.source = result['source'].join('\n')
    this.translation = result['translation'].join('\n')

    if (!this._id) {
      this._id = this.generateId()
    }
  }

  static generateSource (paragraphs: Paragraph[]) {
    return paragraphs.map(p => p.toString()).join('\n\n')
  }

  /** Generate the source string from the paragraph object */
  toString () {
    const source = this.source
    const translation = this.translation
      .split('\n')
      .filter(l => l)
      .map(l => `@${l}`)
      .join('\n')

    return [source, translation, `@!${this._id}`].filter(s => s).join('\n').trim()
  }

  /**
   * Get the final translation of the paragraph.
   * If this paragraph has no translation (maybe intended),
   * use its source instead.
   */
  getTranslation () {
    return this.translation || this.source
  }

  /** Generate a random id using sha1 */
  private generateId () {
    return sha1(this.source + randomString(8))
  }
}

export const paragraphSchema = new Schema({
  _id: String,
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
  tags: {
    type: [String],
    default: () => []
  },
  created: {
    type: Date,
    default: () => new Date()
  },
  updated: {
    type: Date,
    default: () => new Date()
  }
}).loadClass(Paragraph)
