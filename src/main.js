'use strict'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './lib/router'
import Vuetify from 'vuetify'
import VuexMixin from './mixins/vuex'
import { AxiosPlugin } from './lib/axios'

Vue.use(Vuetify)
Vue.use(AxiosPlugin)
Vue.mixin(VuexMixin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
