'use strict'

import Vue from 'vue'

export const titleEvent = new Vue()

export default {
  data: () => ({
    appTitle: 'Eloquent JavaScript'
  }),
  beforeRouteEnter (to, from, next) {
    next(vm => {
      titleEvent.$emit('routeEnter', vm.appTitle)
    })
  },
  beforeRouteLeave (to, from, next) {
    titleEvent.$emit('routeLeave')
    next()
  },
  watch: {
    appTitle (newTitle) {
      titleEvent.$emit('titleChanged', newTitle)
    }
  }
}
