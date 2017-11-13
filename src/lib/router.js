'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  base: '/eloquent-javascript/translator',
  mode: 'history',
  routes: [
    {
      path: '/',
      component: require('../pages/index').default,
      children: [
        { path: '/overview', component: require('../pages/overview').default },
        { path: '/chapters', component: require('../pages/chapters').default },
        { path: '/tags', component: require('../pages/tags').default }
      ]
    },
    { path: '/chapter/:id', component: require('../pages/paragraphs').default },
    { path: '/chapter/:chapterId/paragraph/:paragraphId', component: require('../pages/paragraph').default }
  ]
})
