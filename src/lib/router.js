'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  base: '/eloquent-javascript/translator',
  mode: 'history',
  routes: [
    { path: '/', component: require('../pages/index').default },
    { path: '/chapters', component: require('../pages/chapters').default },
    { path: '/tags', component: require('../pages/tags').default }
  ]
})
