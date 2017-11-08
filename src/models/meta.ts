'use strict'

import db from '../lib/db'
import { Document, Schema, SchemaTypes } from 'mongoose'

interface Meta extends Document {
  _id: string,
  value: any
}

const schema = new Schema({
  _id: String,
  value: SchemaTypes.Mixed
}, {
  toObject: { versionKey: false },
  toJSON: { versionKey: false }
})

const model = db.model<Meta>('meta', schema)

export async function get (key: string, defaultValue?: any): Promise<any> {
  const doc = await model.findById(key)
  if (doc) {
    return (doc.toObject() as any).value
  } else if (defaultValue !== undefined) {
    await set(key, defaultValue)
    return defaultValue
  } else {
    return null
  }
}

export function set (key: string, value: any) {
  return model.findByIdAndUpdate(key, { $set: { value } }, { upsert: true }).exec()
}

export function remove (key: string) {
  return model.findByIdAndRemove(key)
}
