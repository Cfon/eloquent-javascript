<template>
  <v-list id="chapters" two-line>
    <v-list-tile
      v-for="(chapter, index) in chapters"
      :key="chapter._id"
      :class="{ unsaved: !!chapter.unsaved }"
      :to="'/chapter/' + chapter._id"
    >
      <v-list-tile-content>
        <v-list-tile-title :class="{ 'bold': chapter.unsaved }">
          <span>{{ chapter._id }}. {{ chapter.title }}</span><!--
      --><span v-if="chapter.unsaved">*</span>
        </v-list-tile-title>
        <v-list-tile-sub-title>{{ datetimeToString(chapter.updated) }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-content class="progress">
        <v-list-tile-title></v-list-tile-title>
        <v-list-tile-sub-title>{{ progresses[index] }}%</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  import { datetimeToString } from '../lib/util'
  import IndexTitleMixin from 'mixins/index-title'

  export default {
    mixins: [IndexTitleMixin],
    data: () => ({
      appTitle: '章节'
    }),
    computed: {
      progresses () {
        return this.chapters.map(chapter => {
          return Math.round(chapter.passed / chapter.paragraphs * 10000) / 100
        })
      }
    },
    methods: {
      datetimeToString
    }
  }
</script>

<style lang="scss">
  @import '../assets/variables.scss';

  #chapters {
    .progress {
      flex: none;
    }

    .unsaved {
      background-color: fade($primary, 0.15);
    }
  }
</style>
