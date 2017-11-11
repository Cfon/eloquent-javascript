<template>
  <v-list id="chapters" two-line>
    <v-list-tile
      v-for="(chapter, index) in chapters"
      :key="chapter._id"
      :class="{ unsaved: !!chapter.unsaved }"
      :to="'/chapters/' + chapter._id"
    >
      <v-list-tile-content>
        <v-list-tile-title :class="{ 'body-2': chapter.unsaved }">
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
  import AppTitleMixin from 'mixins/app-title'

  export default {
    mixins: [AppTitleMixin],
    data: () => ({
      appTitle: '章节'
    }),
    computed: {
      progresses () {
        return this.chapters.map(chapter => {
          return Math.round(chapter.passed / chapter.paragraphs * 100) / 100
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
