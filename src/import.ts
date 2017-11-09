'use strict'

import Chapter from './models/chapter'
import * as fs from 'mz/fs'
import * as git from './processor/git'
import * as path from 'path'
import importFile from './processor/import'
import * as _glob from 'glob'
import { promisify } from 'util'

const glob = promisify<string, string[]>(_glob as any)
const config = require('../config')

;(async function () {
  const files = await glob(path.join(config.workDir, '[0-9]*.md'))
  await Chapter.remove({})

  for (const file of files) {
    await importFile(file, '首次导入文件')
  }

  await git.commitAll('首次导入文件')
})().catch(err => {
  console.error(err)
  return 1
}).then(code => process.exit(code || 0))
