'use strict'

import render from './markdown'
import escape from 'escape-html'
import { parseData } from './markdown/markdown'

function parseMeta (meta) {
  if (meta.startsWith('{{')) {
    if (meta.endsWith('}}')) {
      meta = meta.slice(2, -2)
    } else {
      meta = meta.slice(2)
    }

    const { tag, args } = parseData(meta)
    const pjson = meta.slice(meta.indexOf(' ') + 1).trim()

    return { tag, args, pjson }
  }
}

export default async function generateDescription ({ source }) {
  let type = 'paragraph', html = '', data = {}

  if (source.startsWith('# ')) {
    type = 'chapter-title'
    html = `<i>章节标题</i>：${source.slice(2)}`
    data = null
  } else if (source.startsWith('{{')) {
    const { tag, args, pjson } = parseMeta(source)
    data = args
    type = 'meta'

    if (source.endsWith('}}')) {
      if (tag === 'meta') {
        html = `<i>元数据</i>：<code>${pjson}</code>`
      } else if (tag === 'figure') {
        type = 'image'
        data = args[0]
        html = `<i>图片</i>：${data.alt}`
      } else if (tag === 'index' || tag === 'indexsee') {
        html = `<i>${tag === 'index' ? '索引' : '另请参见'}</i>：`
        if (Array.isArray(data)) {
          html += data.map(x => `<code>${x}</code>`).join(' ')
        } else {
          html += `<code>${data}</code>`
        }
      }
    } else if (tag === 'quote') {
      data = args[0]
      html = `<i>引用</i>： ${data.author} ${data.title ? `&lt;${data.title}&gt;` : ''}`
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
    } else if (html.startsWith('<pre')) {
      // Do nothing
    } else {
      type = 'unknown'
      html = `<code>${escape(source)}</code>`
    }
  }

  return { type, html, data }
}
