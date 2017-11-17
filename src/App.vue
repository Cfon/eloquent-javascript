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
        <v-nav-drawer-item icon="home" to="/overview" replace exact>总览</v-nav-drawer-item>
        <v-nav-drawer-item icon="book" to="/chapters" replace>章节</v-nav-drawer-item>
        <v-nav-drawer-item icon="label" to="/tags" replace>标签</v-nav-drawer-item>
      </v-list>
    </v-navigation-drawer>
    <transition name="fade" mode="in-out">
      <keep-alive>
        <router-view class="page" @open-drawer="drawer = true"></router-view>
      </keep-alive>
    </transition>
    <v-snackbar absolute :value="!!snackMessage" @input="hideSnack" :timeout="3000">
      <span>{{ snackMessage }}</span>
      <v-spacer></v-spacer>
      <a class="pink--text" @click.native="hideSnack">关闭</a>
    </v-snackbar>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      navHeaderCover: require('./assets/nav-header.png')
    }),
    methods: {
      hideSnack () {
        this.showSnackBar('')
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/octicons.scss';

  body {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }

  code, kbd, pre, samp {
    font-family: Inconsolata, monospace;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .toolbar__title, .title-author {
    user-select: none;
  }

  .bold {
    font-weight: bold;
  }

  .page {
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #fafafa;

    .toolbar {
      z-index: 1;
    }

    & > main {
      position: relative;
      z-index: 0;
      flex: 1;

      & > .content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  #chapters, #paragraphs {
    .list__tile__title {
      font-size: 16px;
    }

    .list__tile__sub-title {
      font-size: 14px;
    }

    @media (max-width: 600px) {
      .list__tile__title, .list__tile__sub-title {
        font-size: 14px;
      }
    }
  }

  .toolbar {
    .progress-linear {
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
      margin: 0;
      transform: translateY(100%);
    }
  }

  .snack {
    bottom: 56px;

    .snack__content {
      height: 56px;
    }
  }
</style>

