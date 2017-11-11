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
      <v-toolbar-title>Eloquent JavaScript</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      navHeaderCover: require('./assets/nav-header.png')
    }),
    mounted () {
      this.fetchData()
    }
  }
</script>

<style lang="scss">
  @import './assets/octicons.scss';

  .toolbar__title, .title-author {
    user-select: none;
  }

  .application {
    height: 100vh;
    overflow: hidden;

    & > main {
      flex-basis: 100%;
      overflow: auto;
    }
  }

  @media (min-width: 1264px) {
    .toggle-drawer {
      display: none;
    }
  }
</style>

