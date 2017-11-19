<template>
  <div id="paragraph">
    <v-toolbar color="primary" app>
      <transition name="fade" mode="out-in">
        <v-btn v-if="editing" key="close" @click="editing = null" :disabled="submitting" icon><v-icon>close</v-icon></v-btn>
        <v-btn v-else key="back" @click="$router.back()" icon><v-icon>arrow_back</v-icon></v-btn>
      </transition>
      <transition name="fade" mode="out-in">
        <v-toolbar-title v-if="editing" key="editing">编辑段落</v-toolbar-title>
        <v-toolbar-title v-else key="previewing">{{ chapter.title }}</v-toolbar-title>
      </transition>
      <v-toolbar-loading></v-toolbar-loading>
    </v-toolbar>
    <transition name="fade" mode="out-in">
      <main v-if="!loading" :class="{ editing }">
        <transition name="fade" mode="out-in" @after-enter="editing && focusEditor()">
          <v-content v-if="editing" key="editor" class="editor">
            <v-container>
              <div class="section-title">标签</div>
              <v-chip class="white--text" small disabled
                v-for="tag in editing.tags"
                :key="tag"
                :style="{ backgroundColor: tags[tag].color }"
                @input="removeTag(tag)"
                close
              >{{ tags[tag].title }}</v-chip>
              <v-menu>
                <v-btn class="add-tag" slot="activator" :disabled="submitting" icon small><v-icon>add</v-icon></v-btn>
                <v-list id="add-tag-menu">
                  <v-list-tile v-for="tag in tagsAddable" :key="tag" @click="editing.tags.push(tag)">
                    <div class="tag-color" :style="{ backgroundColor: tags[tag].color }"></div>
                    <v-list-tile-title class="body-1">{{ tags[tag].title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <div class="section-title">原文</div>
              <pre class="original-content">{{ data.source }}</pre>
            </v-container>
            <v-divider></v-divider>
            <v-container class="translation-editor-wrapper" @click="focusEditor">
              <div class="section-title">
                <span>译文</span>
                <a v-if="!editing.translation" class="copy accent--text" @click="copy">复制原文</a>
              </div>
              <textarea
                class="translation-editor"
                placeholder="在此编辑译文" wrap="off"
                :rows="rows"
                :value="editing.translation"
                :disabled="submitting"
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
              <div class="original-content" v-html="paragraph.source.html"></div>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <div class="section-title">译文</div>
              <div v-if="paragraph.translation.original" v-html="paragraph.translation.html"></div>
              <div v-else class="grey--text"><i>此段落尚未翻译</i></div>
            </v-container>
          </v-content>
        </transition>
        <v-fab-transition v-if="authToken" mode="out-in">
          <v-btn v-if="editing && !submitting" key="check" color="green" @click="submit" dark right bottom fab><v-icon>check</v-icon></v-btn>
          <v-btn v-else-if="!editing" key="edit" color="accent" @click="edit" dark right bottom fab><v-icon>edit</v-icon></v-btn>
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
  </div>
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
      chapterId: null,
      paragraphId: null,
      rows: 2,
      editing: null,
      submitting: false
    }),
    computed: {
      chapter () {
        return this.chapters[this.chapterId] || {}
      },
      paragraph () {
        return this.data.history[this.previewIndex] || { tags: [], source: {}, translation: {} }
      },
      apiUrl () {
        return `/chapter/${this.chapterId}/paragraph/${this.paragraphId}`
      },
      tagsAddable () {
        if (!this.editing) return []
        return Object.keys(this.tags).filter(tag => this.editing.tags.indexOf(tag) === -1)
      }
    },
    methods: {
      datetimeToString,
      async fetch () {
        if (!this.submitting) {
          this.loading = true
        }

        await this.fetching
        const renderHTML = (await import(/* webpackChunkName: "markdown" */ '../lib/paragraph')).default
        const { data } = await this.$http.get(this.apiUrl)
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

        if (!this.submitting) {
          this.loading = false
        }
      },
      updateIds (params = this.$route.params) {
        if (this.chapterId === params.chapterId && this.paragraphId === params.paragraphId) {
          this.loading = false
        } else {
          this.chapterId = params.chapterId
          this.paragraphId = params.paragraphId
        }
      },
      edit () {
        this.editing = {
          tags: this.data.tags.slice(),
          translation: this.data.translation
        }
      },
      copy () {
        this.editing.translation = this.data.source
        this.focusEditor()
      },
      focusEditor () {
        this.$el.querySelector('textarea').focus()
      },
      updateTranslation (e) {
        this.editing.translation = e.target.value
        this.rows = e.target.value.split('\n').length + 1
      },
      removeTag (tag) {
        if (this.submitting) return

        const index = this.editing.tags.indexOf(tag)
        if (index !== -1) {
          this.editing.tags.splice(index, 1)
        }
      },
      async submit () {
        if (this.submitting) return
        this.submitting = true

        const result = (await this.$http.patch(this.apiUrl, this.editing)).data
        if (result == null) {
          await this.fetchData()
          await this.fetch()
          this.showSnackBar('段落已保存')
        } else {
          // TODO: 错误处理
          this.showSnackBar(`段落保存失败：${result.message}`)
        }

        this.submitting = false
        this.editing = null
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
    beforeRouteLeave (to, from, next) {
      if (!this.submitting) {
        this.editing = null
        this.loading = true
        next()
      } else {
        next(false)
      }
    },
    watch: {
      chapterId () { this.fetch() },
      paragraphId () { this.fetch() }
    }
  }
</script>

<style lang="scss">
  #paragraph {
    .original-content, .original-content pre {
      overflow: auto;
    }

    main {
      flex: 1;
      margin-bottom: 56px;
      transition: 0.3s ease;

      &.editing {
        margin-bottom: 0;
      }

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
      display: flex;
      flex-direction: column;

      .section-title {
        display: flex;
      }

      .add-tag {
        display: inline-block;
      }

      .copy {
        margin-left: auto;
      }

      :not(.translation-editor-wrapper) {
        flex: none;
      }

      .translation-editor {
        width: 100%;
        display: block;
        font-family: Inconsolata, 'PingFang SC', 'Microsoft YaHei', monospace;
        font-size: 14px;
        resize: none;
        outline: none;
      }
    }

    #history-nav {
      flex: none;

      &.bottom-nav--active {
        transition-delay: 0.3s;
      }

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

  #add-tag-menu {
    .tag-color {
      width: 12px;
      height: 12px;
      margin-left: 4px;
      margin-right: 16px;
      flex: none;
      border-radius: 50px;
    }
  }
</style>
