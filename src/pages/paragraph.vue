<template>
  <v-app id="paragraph" light>
    <v-toolbar color="primary" app>
      <v-btn @click="$router.back()" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>{{ chapter.title }}</v-toolbar-title>
    </v-toolbar>
    <transition name="fade" mode="out-in">
      <main v-if="!loading" :class="{ editing }">
        <transition name="fade" mode="out-in">
          <v-content v-if="editing" key="editor" class="editor">
            <v-container>
              <div class="section-title">标签</div>
              <v-chip class="white--text" small disabled
                v-for="tag in data.tags"
                :key="tag._id"
                :style="{ backgroundColor: tags[tag].color }"
                close
              >{{ tags[tag].title }}</v-chip>
              <v-btn class="add-tag" icon small><v-icon>add</v-icon></v-btn>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <div class="section-title">原文</div>
              <pre class="original-content">{{ data.source }}</pre>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <div class="section-title">译文</div>
              <textarea
                class="translation-editor"
                placeholder="译文" wrap="off"
                :rows="rows"
                :value="data.translation"
                @input="updateTranslation"
              ></textarea>
            </v-container>
          </v-content>
          <v-content v-else key="preview">
            <v-container>
              <div class="section-title">标签</div>
              <div v-if="!paragraph.tags.length" class="grey--text"><i>无标签</i></div>
              <v-chip class="white--text" small disabled
                v-for="tag in paragraph.tags"
                :key="tag._id"
                :style="{ backgroundColor: tags[tag].color }"
              >{{ tags[tag].title }}</v-chip>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <div class="section-title">原文</div>
              <div v-html="paragraph.source.html"></div>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <div class="section-title">译文</div>
              <div v-if="paragraph.translation.original" v-html="paragraph.translation.html"></div>
              <div v-else class="grey--text"><i>此段落尚未翻译</i></div>
            </v-container>
          </v-content>
        </transition>
        <v-fab-transition mode="out-in">
          <v-btn v-if="editing" key="check" color="green" @click="submit" dark right bottom fab><v-icon>check</v-icon></v-btn>
          <v-btn v-else key="edit" color="accent" @click="editing = true" dark right bottom fab><v-icon>edit</v-icon></v-btn>
        </v-fab-transition>
      </main>
      <v-layout v-else align-center justify-center>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </transition>
    <v-bottom-nav id="history-nav" :value="!loading && !editing" class="white">
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
        tags: [],
        history: []
      },
      previewIndex: 0,
      loading: false,
      editing: false,
      chapterId: null,
      paragraphId: null,
      rows: 2
    }),
    computed: {
      chapter () {
        return this.chapters[this.chapterId] || {}
      },
      paragraph () {
        return this.data.history[this.previewIndex] || { tags: [], source: {}, translation: {} }
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
              tags: data.tags.slice(),
              source: data.source,
              translation: data.translation
            })
          }

          for (const item of data.history) {
            item.source = {
              original: item.source,
              ...(await renderHTML(item.source))
            }

            item.translation = {
              original: item.translation,
              ...(await renderHTML(item.translation))
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
      },
      async submit () {
        this.editing = false
      },
      updateTranslation (e) {
        this.data.translation = e.target.value
        this.rows = e.target.value.split('\n').length + 1
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

    .section-title {
      margin-bottom: 8px;
      font-size: 14px;
      color: #616161;
    }

    main {
      flex: 1;
      margin-bottom: 56px;
      transition: margin-bottom 0.3s ease;

      &.editing {
        margin-bottom: 0;
      }

      .content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
      }

      .btn.btn--floating {
        position: absolute;
        transition-duration: 0.3s;
      }
    }

    .editor {
      .add-tag {
        display: inline-block;
      }

      .original-content {
        overflow: auto;
      }

      .translation-editor {
        width: 100%;
        display: block;
        font-family: Inconsolata, monospace;
        font-size: 14px;
        resize: none;
        outline: none;
      }
    }

    #history-nav {
      flex: none;

      .btn {
        min-width: 0;
        max-width: initial;
        width: 64px;
        flex: none;
        opacity: 0.8 !important;
        background-color: transparent !important;

        .btn__content {
          transition: none;
        }

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
