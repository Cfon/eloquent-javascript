'use strict'

import { Middleware } from 'koa'
import { ValidationFailureError } from '../errors'
import { ajv, fromSchema, Schema } from '../ajv'

/** 数据校验中间件 */
export default function ValidateMiddlewareFactory (schema: Schema): Middleware
export default function ValidateMiddlewareFactory (target: string, schema: Schema): Middleware

export default function ValidateMiddlewareFactory (arg1: string | Schema, arg2?: Schema) {
  let target = 'body'
  let schema: Schema
  if (typeof arg1 === 'string' && arg2) {
    target = arg1
    schema = arg2
  } else {
    schema = arg1 as Schema
  }

  const validator = ajv.compile(fromSchema(schema))
  return (function ValidateMiddleware (ctx, next) {
    const data = (ctx as any)[target]
    if (data == null) throw new ValidationFailureError('Empty data')
    else if (validator(data)) return next()
    else throw new ValidationFailureError(ajv.errorsText(validator.errors as any))
  }) as Middleware
}
