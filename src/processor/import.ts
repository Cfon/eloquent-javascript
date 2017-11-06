'use strict'

import parse from './parser'
import Chapter from '../models/chapter'
import Paragraph from './paragraph'
import * as fs from 'mz/fs'
import * as path from 'path'

export default async function importFile (file: string) {
  const _id = parseInt(path.parse(file).name, 10)
  const input = await fs.readFile(file, 'utf8')
  const paragraphs = parse(input)

  let title: string = ''
  for (const paragraph of paragraphs) {
    const translation = paragraph.getTranslation()
    if (translation.startsWith('# ')) {
      title = translation.slice(2)
    }
  }

  await fs.writeFile(file, Paragraph.generateSource(paragraphs))
  return new Chapter({ _id, file, title, paragraphs }).save()
}
