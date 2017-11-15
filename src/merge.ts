'use strict'

import git from './processor/git'
import { mergeRemote } from './processor/merge'

;(async function () {
  if (process.argv[2]) {
    try {
      await git('--no-pager', 'show', 'MERGE_HEAD')
    } catch (err) {
      console.error('当前不在合并状态，请先手动执行合并操作')
      return 2
    }

    await mergeRemote(process.argv[2])
  } else {
    console.error('请指定提交消息')
    return 3
  }
})().catch(err => {
  console.error(err)
  return 1
}).then(code => process.exit(code || 0))
