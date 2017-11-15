'use strict'

import Paragraph from './paragraph'

const DOUBLE_LINE_BREAK = '\n\n'

export function splitParagraphs (input: string) {
  // split paragraphs by empty lines
  const paragraphs = input
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(p => p)

  for (let [i, paragraph] of paragraphs.entries()) {
    // merge code blocks (because there may have empty lines in code blocks)
    if (/^```/.test(paragraph) && !/^```$/m.test(paragraph.slice(3))) {
      let j: number
      for (j = i + 1; j < paragraphs.length; j++) {
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

    // split meta fields
    if (/^{{/.test(paragraph)) {
      const lineBreak = paragraph.indexOf('\n')
      const meta = paragraph.slice(0, lineBreak)
      const nextParagraph = paragraph.slice(lineBreak + 1)

      if (lineBreak >= 0 && nextParagraph && !nextParagraph.startsWith('@')) {
        paragraphs.splice(i, 1, meta, nextParagraph)
      }
    } else if (/}}$/.test(paragraph)) {
      const lineBreak = paragraph.lastIndexOf('\n')
      const previousParagraph = paragraph.slice(0, lineBreak)
      const meta = paragraph.slice(lineBreak + 1)

      if (lineBreak >= 0 && previousParagraph) {
        paragraphs.splice(i, 1, previousParagraph, meta)
      }
    }
  }

  return paragraphs
}

export default function parse (input: string) {
  const paragraphs = splitParagraphs(input)

  // convert paragraphs to string
  return paragraphs.map(p => new Paragraph(p))
}
