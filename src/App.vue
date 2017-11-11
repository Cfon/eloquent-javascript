<template>
  <v-app light>
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
        <v-nav-drawer-item icon="home" to="/" exact>总览</v-nav-drawer-item>
        <v-nav-drawer-item icon="book" to="/chapters">章节</v-nav-drawer-item>
        <v-nav-drawer-item icon="label" to="/tags">标签</v-nav-drawer-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" app>
      <v-toolbar-side-icon class="toggle-drawer" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
  import { titleEvent } from 'mixins/app-title'

  export default {
    data: () => ({
      title: 'Eloquent JavaScript',
      showTitle: true,
      drawer: false,
      navHeaderCover: require('./assets/nav-header.png')
    }),
    mounted () {
      this.fetchData()

      titleEvent.$on('routeEnter', title => {
        this.title = title
        this.showTitle = true
      })

      titleEvent.$on('routeLeave', () => { this.showTitle = false })
      titleEvent.$on('titleChanged', title => { this.title = title })
    }
  }
</script>

<style lang="scss">
  @import './assets/octicons.scss';

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .toolbar__title, .title-author {
    user-select: none;
  }

  .application {
    height: 100vh;
    overflow: hidden;

    .toolbar {
      z-index: 1;
    }

    & > main {
      position: relative;
      z-index: 0;
    }

    .content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }

  @media (min-width: 1264px) {
    .toggle-drawer {
      display: none;
    }
  }
</style>

