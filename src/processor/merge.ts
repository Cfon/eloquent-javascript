'use strict'

import parse from './parser'
import Paragraph from './paragraph'
import { readFileSync, writeFileSync } from 'fs'

function changeMatches (input: string, content: string, matches: RegExpMatchArray) {
  return input.slice(0, matches.index) + content +
    input.slice((matches.index || 0) + matches[0].length)
}

/**
 * Merge changes from marijnh/3rd.
 * This will search for git merge notations,
 * then keep translations and meta unchanged,
 * and update the source with a 'sourceUpdated' meta added.
 */
export default function merge (filename: string) {
  let input = readFileSync(filename, 'utf8')

  let matches: RegExpMatchArray | null
  while (matches = input.match(/<<<<<<< HEAD\n((?:.|\n)*?)=======\n((?:.|\n)*?)>>>>>>> [0-9a-z]+/)) {
    try {
      let result: Paragraph[]
      const ours = parse(matches[1])
      const theirs = parse(matches[2])

      if (ours.length === theirs.length) {
        // merge source content from theirs to ours
        result = ours
        for (const [i, p] of result.entries()) {
          p.meta.updated = { from: p.source, to: theirs[i].source }
          p.source = theirs[i].source
        }
      } else {
        result = theirs
      }

      input = changeMatches(input, Paragraph.generateSource(result), matches)
    } catch (err) {
      // if error occurred, just directly use theirs version
      input = changeMatches(input, matches[2], matches)
    }
  }

  // parse and generate again to make sure that every paragraph has an id
  input = Paragraph.generateSource(parse(input))
  writeFileSync(filename, input)
}
