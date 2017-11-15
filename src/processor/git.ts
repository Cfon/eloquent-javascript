'use strict'

import logger from '../lib/logger'
import * as path from 'path'
import * as shelljs from 'shelljs'
import { GitError } from '../lib/errors'
import { mergeRemote } from './merge'

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

export function add (...files: string[]) {
  return git('add', ...files)
}

export function commit (message: string) {
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

export async function merge (message: string) {
  // make sure that it is not in middle of a merge
  await git('--no-pager', 'show', 'MERGE_HEAD')
    .then(() => { throw new GitError('There is another merge or rebase in progress') }, () => null)

  try {
    // merge without commit to get the changes. also ignore merge errors
    await git('merge', config.remote, '--no-ff', '--no-commit').catch(() => null)

    // do merge
    await mergeRemote(message)
  } catch (err) {
    // if there are error occurred, about the merge
    await git('merge', '--abort')
    throw err
  }
}
