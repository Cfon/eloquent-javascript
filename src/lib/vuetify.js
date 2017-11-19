'use strict'

export default {
  install (Vue) {
    Vue.component('v-index-card', require('../components/v-index-card').default)
    Vue.component('v-nav-drawer-item', require('../components/v-nav-drawer-item').default)
    Vue.component('v-toolbar-loading', require('../components/v-toolbar-loading').default)
  }
}
