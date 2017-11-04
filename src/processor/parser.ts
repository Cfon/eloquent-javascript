'use strict'

import Paragraph from './paragraph'
import { readFileSync } from 'fs'

const DOUBLE_LINE_BREAK = '\n\n'

export default function parse (filename: string) {
  // split paragraphs by empty lines
  const paragraphs = readFileSync(filename, 'utf8')
    .split(DOUBLE_LINE_BREAK)
    .map(p => p.trim())
    .filter(p => p)

  for (let [i, paragraph] of paragraphs.entries()) {
    // merge code blocks (because there may have empty lines in code blocks)
    if (/^```/.test(paragraph) && !/```(\nif}})?$/.test(paragraph)) {
      let j: number
      for (j = i + 1; j < paragraph.length; j++) {
        if (/^```$/m.test(paragraphs[j])) {
          break
        }
      }

      if (j === paragraphs.length) {
        throw new SyntaxError('Code block did not ends.')
      } else {
        const remainingContent = paragraphs
          .splice(i + 1, j - i)
          .join(DOUBLE_LINE_BREAK)

        paragraph = paragraphs[i] += DOUBLE_LINE_BREAK + remainingContent
      }
    }
  }

  paragraphs.forEach(p => {
    const s = new Paragraph(p).toString()
    if (s !== p) {
      debugger
    }
  })

  // convert paragraphs to string
  return paragraphs.map(p => new Paragraph(p))
}
