'use strict'

import Chapter from '../models/chapter'
import Paragraph from './paragraph'
import * as path from 'path'
import importFile from './import'
import { GitError } from '../lib/errors'
import git, { status } from './git'
import { DocumentQuery } from 'mongoose'
import { readFile, writeFile } from 'mz/fs'
import parse, { splitParagraphs } from './parser'

const config = require('../../config')

function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function regexp () {
  return /<<<<<<< HEAD\n((?:.|\n)*?)=======\n((?:.|\n)*?)>>>>>>> .*/
}

/** 将 input 中的一块 diff 更改为 content */
function changeMatches (input: string, content: string, matches: RegExpMatchArray) {
  return input.slice(0, matches.index) + content +
    input.slice((matches.index || 0) + matches[0].length)
}

export async function mergeFile (filename: string) {
  let input = await readFile(filename, 'utf8')
  let matches: RegExpMatchArray | null

  // 先直接处理带有 diff 的文件，找出只更改了一段的部分
  const paragraphs = splitParagraphs(input)
  for (const [i, paragraphRaw] of paragraphs.entries()) {
    try {
      const paragraph = new Paragraph(paragraphRaw)
      while (matches = paragraph.source.match(regexp())) {
        paragraph.source = changeMatches(paragraph.source, matches[2], matches).trim()
      }

      paragraphs[i] = paragraph.toString()
    } catch (err) { /* do nothing */ }
  }

  input = paragraphs.join('\n\n')

  // 剩下的是有多个段落更改的 diff，只处理有相同段落数量的更改
  while (matches = input.match(regexp())) {
    try {
      let result: Paragraph[]
      const ours = parse(matches[1])
      const theirs = parse(matches[2])

      if (ours.length === theirs.length) {
        // merge source content from theirs to ours
        result = ours
        for (const [i, p] of result.entries()) {
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

  // parse again to make sure that every paragraph has an id
  return parse(input)
}

export async function mergeRemote (message: string) {
  const pendingActions: (() => DocumentQuery<any, any> | Promise<any>)[] = []

  const allChanges = (await status())
    .map(({ file, flag }) => ({
      file,
      flag,
      fullPath: path.join(config.workDir, file),
      chapterId: parseInt(file, 10),
      paragraphs: null as Paragraph[] | null
    }))

  if (allChanges.some(c => c.flag[0] === 'U' && !/^[012].*\.md$/.test(c.file))) {
    throw new GitError('需要手动合并')
  }

  const changes = allChanges.filter(c => /^[012].*\.md$/.test(c.file))

  // firstly look for unmerged files
  const removedChapters: number[] = []
  for (const change of changes.filter(c => c.flag.startsWith('U'))) {
    if (change.flag === 'UU') {
      change.paragraphs = await mergeFile(change.fullPath)
    } else if (change.flag === 'UD') {
      removedChapters.push(change.chapterId)
      pendingActions.push(async () => {
        await git('rm', change.file)
        await Chapter.findByIdAndRemove(change.chapterId)
      })
    } else {
      throw new GitError(`无法识别的文件更改：${JSON.stringify(change)}`)
    }
  }

  // then merge other changes
  for (const change of changes) {
    if (change.flag === 'UD') continue

    const chapter = await Chapter.findById(change.chapterId)
    if (chapter) {
      let paragraphs: Paragraph[]
      if (change.flag === 'A' && removedChapters.includes(change.chapterId)) {
        pendingActions.push(() => importFile(change.fullPath, message))
      } else {
        if (change.flag === 'UU' && change.paragraphs) {
          paragraphs = change.paragraphs
        } else if (change.flag === 'M') {
          const input = await readFile(change.fullPath, 'utf8')
          paragraphs = parse(input)
        } else {
          throw new GitError(`无法识别的文件更改：${JSON.stringify(change)}`)
        }

        pendingActions.push(async () => {
          await chapter.updateParagraphs(paragraphs, message)
          await chapter.export()
        })
      }
    } else if (change.flag === 'A') {
      pendingActions.push(() => importFile(change.fullPath, message))
    }

    pendingActions.push(() => git('add', change.file))
  }

  // do merge actions
  for (const action of pendingActions) {
    await action()
    await delay(10)
  }

  // finally commit the merge
  await git('commit', '-m', message)
}
