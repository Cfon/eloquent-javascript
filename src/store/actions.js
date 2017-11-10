'use strict'

import { axios } from '../lib/axios'

export default {
  async fetchData ({ commit }) {
    const promise = Promise.all(['tags', 'chapters', 'origin'].map(s => axios.get(s)))
    commit('START_FETCH', promise)

    const [tags, chapters, commitsBehind] = await promise
    commit('SET_TAGS', tags.data)
    commit('SET_CHAPTERS', chapters.data)
    commit('SET_COMMITS_BEHIND', commitsBehind.data)

    commit('FINISH_FETCH')
  }
}
