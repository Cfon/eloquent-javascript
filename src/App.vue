<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" light temporary app>
      <v-card class="elevation-0" tile>
        <v-card-media :src="cover" height="150px">
          <v-container fill-height fluid>
            <v-layout column>
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Eloquent JavaScript</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      cover: require('./assets/nav-header.png'),
      drawer: false
    })
  }
</script>

<style lang="scss">
  .toolbar__title {
    user-select: none;
  }
</style>

