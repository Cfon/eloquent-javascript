'use strict'

import db from '../lib/db'
import { Document, Schema } from 'mongoose'

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

export default db.model<Tag>('tag', schema)
