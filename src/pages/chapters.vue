<template>
  <div id="overview">
    <v-toolbar color="primary" app>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="$emit('open-drawer')"></v-toolbar-side-icon>
      <v-toolbar-title>章节</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
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
      </v-content>
    </main>
  </div>
</template>

<script>
  import { datetimeToString } from '../lib/util'

  export default {
    computed: {
      progresses () {
        return this.chapters.map(chapter => {
          return Math.round(chapter.passed / chapter.paragraphsCount * 10000) / 100
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
