<template functional>
  <v-progress-linear v-if="parent.submitting" class="toolbar-loading" color="accent" background-color="transparent" :height="2" :indeterminate="true"></v-progress-linear>
</template>

<style lang="scss">
  .toolbar-loading {
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 100%;
    margin: 0;
    transform: translateY(100%);
  }
</style>
