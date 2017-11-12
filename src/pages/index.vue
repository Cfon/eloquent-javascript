<template>
  <v-app id="index" light>
    <v-navigation-drawer v-model="drawer" enable-resize-watcher light persistent app>
      <v-card class="elevation-0" tile>
        <v-card-media :src="navHeaderCover" height="150px">
          <v-container fill-height fluid>
            <v-layout column class="title-author">
              <span class="subheading" style="font-weight: 500">Eloquent JavaScript</span>
              <span class="body-1">Marijn Haverbeke</span>
            </v-layout>
          </v-container>
        </v-card-media>
      </v-card>
      <v-list>
        <v-nav-drawer-item icon="home" to="/overview" replace exact>总览</v-nav-drawer-item>
        <v-nav-drawer-item icon="book" to="/chapters" replace>章节</v-nav-drawer-item>
        <v-nav-drawer-item icon="label" to="/tags" replace>标签</v-nav-drawer-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" app>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <transition name="fade" mode="out-in">
        <v-toolbar-title v-if="showTitle">{{ title }}</v-toolbar-title>
      </transition>
    </v-toolbar>
    <main>
      <v-content>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  import { titleEvent } from 'mixins/index-title'

  export default {
    data: () => ({
      title: 'Eloquent JavaScript',
      showTitle: true,
      drawer: false,
      navHeaderCover: require('../assets/nav-header.png')
    }),
    mounted () {
      titleEvent.$on('routeEnter', title => {
        this.title = title
        this.showTitle = true
      })

      titleEvent.$on('routeLeave', () => { this.showTitle = false })
      titleEvent.$on('titleChanged', title => { this.title = title })
    }
  }
</script>
