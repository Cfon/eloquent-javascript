'use strict'

export default {
  install (Vue) {
    Vue.component('v-nav-drawer-item', require('../components/v-nav-drawer-item').default)
  }
}
