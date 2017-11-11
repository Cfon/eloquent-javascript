'use strict'

import parse from './parser'
import Chapter from '../models/chapter'
import Paragraph from './paragraph'
import * as fs from 'mz/fs'
import * as path from 'path'

export default async function importFile (file: string, message: string = '首次导入文件') {
  const _id = parseInt(path.parse(file).name, 10)
  const input = await fs.readFile(file, 'utf8')
  const paragraphs = parse(input)

  let title: string = ''
  for (const paragraph of paragraphs) {
    paragraph.pushHistory(message)
  }

  const chapter = await new Chapter({ _id, file, title, paragraphs })
  chapter.updateTitle()

  await fs.writeFile(file, Paragraph.generateSource(paragraphs))
  return chapter.save()
}
