<template>
  <transition name="fade" mode="in-out">
    <keep-alive>
      <router-view class="top-level-page"></router-view>
    </keep-alive>
  </transition>
</template>

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

  .top-level-page {
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .toolbar {
      z-index: 1;
    }

    & > main {
      position: relative;
      z-index: 0;

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
</style>

