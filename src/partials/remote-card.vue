<template>
  <v-index-card title="远程仓库" icon="octicons-mark-github">
    <v-card-text>在远程仓库中有 {{ commitsBehind.length }} 个新的更改可以合并。</v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn flat color="accent">查看详情</v-btn>
      <v-btn flat color="accent">立即合并</v-btn>
    </v-card-actions>
  </v-index-card>
</template>
