'use strict'

import merge from './merge'
import parse from './parser'
import logger from '../lib/logger'
import Chapter from '../models/chapter'
import Paragraph from './paragraph'
import * as path from 'path'
import importFile from './import'
import * as shelljs from 'shelljs'
import { readFile } from 'mz/fs'
import { GitError } from '../lib/errors'

const config = require('../../config')

export default function git (...args: string[]) {
  const gitArgs = [`--work-tree=${config.workDir}`, `--git-dir=${path.join(config.workDir, '.git')}`, ...args]
  const gitArgsString = gitArgs.map(s => `"${s}"`).join(' ')
  logger.debug('git', ...args)

  return new Promise<string>((resolve, reject) => {
    shelljs.exec('git ' + gitArgsString, (code, stdout, stderr) => {
      if (code) {
        logger.error(stderr || stdout)
        reject(new GitError(stderr || stdout))
      } else {
        resolve(stdout)
      }
    })
  })
}

export function push (...args: string[]) {
  return git('push', ...args)
}

export function fetch () {
  return git('fetch', '--all')
}

export async function status () {
  return (await git('status', '-s'))
    .split('\n')
    .map(s => s.split(/\s+/))
    .map(s => ({ file: s[1], flag: s[0] }))
}

export async function commitAll (message: string) {
  await git('add', '--all')
  return git('commit', '-m', message)
}

export async function currentBranch () {
  const result = await git('branch')
  return (result.split('\n').find(s => s.startsWith('*')) || '').slice(2)
}

export async function remoteChanges () {
  const branch = await currentBranch()
  const commitsRaw = await git('rev-list', '--left-right', `${branch}...${config.remote}`)
  const commits = commitsRaw.split('\n').filter(s => s[0] === '>').map(s => s.slice(1))

  const result: { hash: string, message: string }[] = []
  for (const hash of commits) {
    result.push({
      hash,
      message: (await git('--no-pager', 'log', '--format=%B', '-n', '1', hash)).trim()
    })
  }

  return result
}

export async function mergeRemote (message: string) {
  // make sure that it is not in middle of a merge
  await git('--no-pager', 'show', 'MERGE_HEAD')
    .then(() => { throw new GitError('There is another merge or rebase in progress') }, () => null)

  try {
    // ignore merge errors
    await git('merge', config.remote, '--no-ff', '--no-commit').catch(() => null)

    // merge all chapters
    for (const { file, flag } of await status()) {
      if (!/^[012].*\.md$/.test(file)) continue

      const fullPath = path.join(config.workDir, file)
      const chapterId = parseInt(file, 10)

      let paragraphs: Paragraph[] = []
      if (flag === 'UU') {
        paragraphs = await merge(fullPath)
      } else if (flag === 'M' || flag === 'A') {
        const input = await readFile(fullPath, 'utf8')
        paragraphs = parse(input)
      }

      const chapter = await Chapter.findById(chapterId)
      if (chapter) {
        await chapter.updateParagraphs(paragraphs, message)
        chapter.updateTitle()
        await chapter.export()
      } else {
        // create new database record if the record is not exist
        await importFile(fullPath, message)
      }

      await git('add', file)
    }

    // finally commit the merge
    await git('commit', '-m', message)
  } catch (err) {
    // if there are error occurred, about the merge
    await git('merge', '--abort')
    throw err
  }
}
