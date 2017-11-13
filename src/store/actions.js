'use strict'

import { axios } from '../lib/axios'

export default {
  fetchData ({ commit }) {
    const promises = ['tags', 'chapters', 'origin'].map(s => axios.get(s))
    const promise = Promise.all(promises).then(result => {
      if (result.every(item => item.status === 200)) {
        const [tags, chapters, commitsBehind] = result

        commit('SET_TAGS', tags.data.reduce((tags, tag) => {
          tags[tag._id] = tag
          return tags
        }, {}))

        commit('SET_CHAPTERS', chapters.data.map(chapter => Object.assign(chapter, {
          fetching: false,
          paragraphs: [],
          paragraphsCount: chapter.paragraphs
        })))

        commit('SET_COMMITS_BEHIND', commitsBehind.data)
      } else {
        // TODO: 错误处理
      }

      commit('FINISH_FETCH')
    })

    commit('START_FETCH', promise)
    return promise
  },
  async fetchChapter ({ state, commit }, chapterId) {
    const chapter = state.chapters[chapterId]
    if (!chapter.fetching && chapter.paragraphs.length < chapter.paragraphsCount) {
      commit('START_CHAPTER_FETCH', chapterId)

      try {
        const nextPage = Math.ceil(chapter.paragraphs.length / 10) + 1
        const url = `chapter/${chapterId}/paragraphs/${nextPage}`
        const { items: paragraphs } = (await axios.get(url)).data

        const generateDescription = (await import(/* webpackChunkName: "markdown" */ '../lib/paragraph')).default
        for (const paragraph of paragraphs) {
          Object.assign(paragraph, await generateDescription(paragraph))
        }

        commit('PUSH_PARAGRAPHS', { chapterId, paragraphs })
      } catch (err) {
        // TODO: 错误处理
        console.error(err)
      }

      commit('FINISH_CHAPTER_FETCH', chapterId)
    }
  }
}
