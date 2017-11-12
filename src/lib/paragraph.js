'use strict'

import render from './markdown'
import escape from 'escape-html'
import * as PJSON from './markdown/pseudo_json'

function pseudoParse (pjson) {
  try {
    return PJSON.parse(pjson)
  } catch (err) {
    return null
  }
}

function parseMeta (meta) {
  if (meta.startsWith('{{')) {
    if (meta.endsWith('}}')) {
      meta = meta.slice(2, -2)
    } else {
      meta = meta.slice(2)
    }

    const firstWhitespace = meta.indexOf(' ')
    const tag = meta.slice(0, firstWhitespace)

    let pjson = meta.slice(firstWhitespace + 1)
    if (tag === 'index') {
      pjson = `[${pjson}]`
    }

    return { tag, pjson }
  }
}

export default async function generateDescription ({ source }) {
  let type = 'paragraph', html = '', data = {}

  if (source.startsWith('# ')) {
    type = 'chapter-title'
    html = `<i>章节标题</i>：${source.slice(2)}`
    data = null
  } else if (source.startsWith('{{')) {
    const { tag, pjson } = parseMeta(source)
    data = pseudoParse(pjson)
    type = 'meta'

    if (source.endsWith('}}')) {
      if (tag === 'meta') {
        html = `<i>元数据</i>：<code>${pjson}</code>`
      } else if (tag === 'figure') {
        type = 'image'
        html = `<i>图片</i>：${data.alt}`
      } else if (tag === 'index') {
        html = `<i>索引</i>：`
        if (Array.isArray(data)) {
          html += data.map(x => `<code>${x}</code>`).join(' ')
        } else {
          html += `<code>${data}</code>`
        }
      }
    } else if (tag === 'quote') {
      html = `<i>引用 ${data.author} &lt;${data.title}&gt;</i>`
    }
  } else if (source.endsWith('}}')) {
    const tag = source.slice(0, -2)
    type = 'meta'

    if (tag === 'quote') {
      html = `<i>结束引用</i>`
    } else {
      html = `<i>元数据 ${tag} 结束</i>`
    }
  } else {
    html = render(source).trim()
    data = null

    if (html.startsWith('<p>')) {
      html = html.slice(3, -4)
    } else {
      type = 'unknown'
      html = `<code>${escape(source)}</code>`
    }
  }

  return { type, html, data }
}
