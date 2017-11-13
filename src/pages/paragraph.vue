<template>
  <v-app id="paragraph" light>
    <v-toolbar color="primary" app>
      <v-btn @click="$router.back()" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>{{ chapter.title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container>
          <div v-if="paragraph.source.original">
            <div class="card-title">原文</div>
            <v-card>
              <v-card-title v-html="paragraph.source.html"></v-card-title>
            </v-card>
          </div>
          <div v-if="paragraph.translation.original">
            <div class="card-title">译文</div>
            <v-card>
              <v-card-title v-html="paragraph.translation.html"></v-card-title>
            </v-card>
          </div>
        </v-container>
      </v-content>
    </main>
    <v-bottom-nav id="history-nav" :value="true" class="white">
      <v-btn :disabled="previewIndex <= 0" @click="previewIndex--">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn :ripple="false" class="message black--text">
        <div v-if="paragraph.unsaved">未提交的版本</div>
        <div v-if="!paragraph.unsaved">{{ datetimeToString(paragraph.date) }}</div>
        <div v-if="!paragraph.unsaved">{{ paragraph.message }}</div>
      </v-btn>
      <v-btn :disabled="previewIndex >= data.history.length - 1" @click="previewIndex++">
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
  import { datetimeToString } from '../lib/util'

  export default {
    data: () => ({
      data: {
        history: []
      },
      previewIndex: 0,
      loading: false,
      notFound: false,
      chapterId: null,
      paragraphId: null
    }),
    computed: {
      chapter () {
        return this.chapters[this.chapterId] || {}
      },
      paragraph () {
        return this.data.history[this.previewIndex] || { source: {}, translation: {} }
      }
    },
    methods: {
      datetimeToString,
      async fetch () {
        if (this.loading) return
        this.loading = true

        await this.fetching
        const renderHTML = (await import(/* webpackChunkName: "markdown" */ '../lib/paragraph')).default
        const { data } = await this.$http.get(`/chapter/${this.chapterId}/paragraph/${this.paragraphId}`)

        if (data) {
          const lastHistoryItem = data.history[data.history.length - 1]
          if (lastHistoryItem.source !== data.source || lastHistoryItem.translation !== data.translation) {
            data.history.push({
              unsaved: true,
              source: data.source,
              translation: data.translation
            })
          }

          for (const item of data.history) {
            item.source = {
              original: data.source,
              ...(await renderHTML(data.source))
            }

            item.translation = {
              original: data.translation,
              ...(await renderHTML(data.translation))
            }
          }

          this.previewIndex = data.history.length - 1
          this.data = data
        } else {
          this.notFound = true
        }

        this.loading = false
      },
      updateIds (params = this.$route.params) {
        this.chapterId = params.chapterId
        this.paragraphId = params.paragraphId
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.updateIds())
    },
    mounted () {
      this.fetch()
    },
    beforeRouteUpdate (to, from, next) {
      next()
      this.updateIds(to.params)
    },
    watch: {
      chapterId () { this.fetch() },
      paragraphId () { this.fetch() }
    }
  }
</script>

<style lang="scss">
  #paragraph {
    code {
      font-size: 14px;
      font-weight: normal;

      &.inline {
        display: inline;
      }
    }

    .card-title {
      margin-bottom: 8px;
      font-size: 14px;
    }

    #history-nav {
      .btn {
        min-width: 0;
        max-width: initial;
        width: 64px;
        flex: none;
        opacity: 0.8 !important;
        background-color: transparent !important;

        .btn__content::before {
          background-color: transparent !important;
        }
      }

      .message {
        flex: 1;
      }
    }
  }
</style>
