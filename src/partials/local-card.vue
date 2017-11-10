<template>
  <v-index-card id="local-card" title="本地仓库" icon="octicons-repo">
    <v-card-text>在本地仓库中有 {{ unsavedCount }} 个更改尚未提交。</v-card-text>
    <v-divider></v-divider>
    <v-list dense>
      <template v-for="(chapter, index) in unsavedChapters">
        <v-list-tile>
          <v-list-tile-content class="chapter body-1">
            <span>第 {{ chapter._id }} 章 {{ chapter.title }}</span>
            <v-spacer></v-spacer>
            <span class="accent--text">1</span>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index !== unsavedChapters.length - 1"></v-divider>
      </template>
    </v-list>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn flat color="accent">提交更改</v-btn>
    </v-card-actions>
  </v-index-card>
</template>

<script>
  export default {
    computed: {
      unsavedChapters () {
        return this.chapters.filter(c => c.unsaved)
      }
    }
  }
</script>

<style lang="scss">
  #local-card {
    .chapter {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
</style>
