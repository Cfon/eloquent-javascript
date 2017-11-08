'use strict'

/** 自定义错误 */
export default class UserError extends Error {
  /** 错误编号 */
  code: number

  /** 该错误对应的 HTTP 响应码 */
  statusCode: number

  constructor (message: string, code: number = -1, statusCode: number = 500) {
    super(message)
    this.code = code
    this.statusCode = statusCode
  }

  toString () {
    let stack = ''
    if (this.stack) {
      stack = '\n' + this.stack.slice(this.stack.indexOf('\n') + 1)
    }

    return `${this.code} ${Object.getPrototypeOf(this).constructor.name}: ${this.message}${stack}`
  }
}

/** token 验证失败 */
export class TokenAuthorizationError extends UserError {
  constructor () {
    super('无效的 token', 100, 401)
  }
}

/** 用户输入验证失败 */
export class ValidationFailureError extends UserError {
  constructor (message: string) {
    super(message, 101, 400)
  }
}

/** 未授权 */
export class NotAuthorizedError extends UserError {
  constructor () {
    super('未授权的请求', 102, 403)
  }
}

/** 文件合并错误 */
export class MergeError extends UserError {
  constructor (message: string) {
    super(message, 103, 403)
  }
}

/** 未找到请求的内容 */
export class NotFoundError extends UserError {
  constructor (message: string) {
    super(message, 104, 404)
  }
}

/** 章节未找到 */
export class ChapterNotFoundError extends NotFoundError {
  constructor (id: number) {
    super(`没有 id 为 ${id} 的章节`)
  }
}

/** 段落未找到 */
export class ParagraphNotFoundError extends NotFoundError {
  constructor (chapter: number, paragraph: string) {
    super(`在第 ${chapter} 章中没有 id 为 ${paragraph} 的段落`)
  }
}

/** 标签未找到 */
export class TagNotFoundError extends NotFoundError {
  constructor (tag: string) {
    super(`没有名字为 ${tag} 的标签`)
  }
}

/** Git 错误 */
export class GitError extends UserError {
  constructor (message: string) {
    super(message, 105, 500)
  }
}
