'use strict'

import { axios } from '../lib/axios'

export default {
  async fetchData ({ commit }) {
    const promise = Promise.all(['tags', 'chapters', 'origin'].map(s => axios.get(s)))
    commit('START_FETCH', promise)

    const result = await promise
    if (result.every(item => item.status === 200)) {
      const [tags, chapters, commitsBehind] = result
      commit('SET_TAGS', tags.data)
      commit('SET_CHAPTERS', chapters.data)
      commit('SET_COMMITS_BEHIND', commitsBehind.data)
    } else {
      // TODO: 错误处理
    }

    commit('FINISH_FETCH')
  }
}
