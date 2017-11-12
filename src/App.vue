<template>
  <transition name="fade" mode="in-out">
    <keep-alive>
      <router-view class="top-level-page"></router-view>
    </keep-alive>
  </transition>
</template>

<style lang="scss">
  @import './assets/octicons.scss';

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

  #chapters, #paragraphs {
    .list__tile__title {
      font-size: 16px;
    }

    .list__tile__sub-title {
      font-size: 14px;
    }

    @media (max-width: 600px) {
      .list__tile__title {
        font-size: 14px;
      }

      .list__tile__sub-title {
        font-size: 12px;
      }
    }
  }
</style>

