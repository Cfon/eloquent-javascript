'use strict'

import './assets/theme.styl'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './lib/router'
import Vuetify from 'vuetify'
import VuexMixin from './mixins/vuex'
import VuetifyHelper from './lib/vuetify'
import { AxiosPlugin } from './lib/axios'

Vue.use(Vuetify)
Vue.use(AxiosPlugin)
Vue.use(VuetifyHelper)
Vue.mixin(VuexMixin)
Vue.config.productionTip = false

store.dispatch('setToken', localStorage.getItem('ejs-token') || '')
store.dispatch('fetchData')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
