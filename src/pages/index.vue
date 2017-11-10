<template>
  <v-container grid-list-xl>
    <v-layout row wrap justify-center>
      <remote-card v-if="commitsBehind.length"></remote-card>
    </v-layout>
  </v-container>
</template>

<script>
  import RemoteCard from '../partials/remote-card'

  export default {
    components: {
      RemoteCard
    }
  }
</script>
