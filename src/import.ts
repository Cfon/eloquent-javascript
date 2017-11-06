'use strict'

import parse from './processor/parser'
import Chapter from './models/chapter'
import Paragraph from './processor/paragraph'
import * as fs from 'mz/fs'
import * as path from 'path'
import * as _glob from 'glob'
import { promisify } from 'util'

const glob = promisify<string, string[]>(_glob as any)
const config = require('../config')

;(async function () {
  const files = await glob(path.join(config.workDir, '[0-9]*.md'))
  await Chapter.remove({})

  for (const file of files) {
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
    await new Chapter({ _id, file, title, paragraphs }).save()
  }
})().catch(err => {
  console.error(err)
  return 1
}).then(code => process.exit(code || 0))
