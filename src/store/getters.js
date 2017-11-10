'use strict'

export default {
  unsavedCount (state) {
    return state.chapters.reduce((result, chapter) => {
      return result + chapter.unsaved
    }, 0)
  }
}
