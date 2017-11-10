'use strict'

export default {
  START_FETCH (store, promise) {
    store.fetching = promise
  },
  FINISH_FETCH (store) {
    store.fetching = false
  },
  SET_TAGS (store, value) {
    store.tags = value
  },
  SET_CHAPTERS (store, value) {
    store.chapters = value
  },
  SET_COMMITS_BEHIND (store, value) {
    store.commitsBehind = value
  }
}
