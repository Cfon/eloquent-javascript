<template>
  <v-container grid-list-xl>
    <v-layout row wrap justify-center>
      <v-index-card v-if="unsavedCount" id="local-card" title="本地仓库" icon="octicons-repo">
        <v-card-text>在本地仓库中有 {{ unsavedCount }} 个更改尚未提交。</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat color="accent" @click="$router.push('/commit')">提交更改</v-btn>
        </v-card-actions>
      </v-index-card>
      <v-index-card v-if="commitsBehind.length" title="远程仓库" icon="octicons-mark-github">
        <v-card-text>在远程仓库中有 {{ commitsBehind.length }} 个新的更改可以合并。</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn flat color="accent">查看详情</v-btn>
          <v-btn flat color="accent">立即合并</v-btn>
        </v-card-actions>
      </v-index-card>
    </v-layout>
  </v-container>
</template>

<script>
  import IndexTitleMixin from 'mixins/index-title'

  export default {
    mixins: [IndexTitleMixin],
    data: () => ({
      appTitle: '总览'
    })
  }
</script>
