<template>
  <v-container grid-list-xl>
    <v-layout row wrap justify-center>
      <remote-card v-if="commitsBehind.length"></remote-card>
      <local-card v-if="unsavedCount"></local-card>
    </v-layout>
  </v-container>
</template>

<script>
  import LocalCard from 'partials/local-card'
  import RemoteCard from 'partials/remote-card'

  export default {
    components: {
      LocalCard,
      RemoteCard
    }
  }
</script>
