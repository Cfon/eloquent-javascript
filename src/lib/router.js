'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  base: '/eloquent-javascript/translator',
  mode: 'history',
  routes: [
    { path: '/overview', component: require('../pages/overview').default, alias: '/' },
    { path: '/chapters', component: require('../pages/chapters').default },
    { path: '/chapter/:id', component: require('../pages/paragraphs').default },
    { path: '/chapter/:chapterId/paragraph/:paragraphId', component: require('../pages/paragraph').default },
    { path: '/commit', component: require('../pages/commit').default },
    { path: '/pull', component: require('../pages/pull').default }
  ]
})
