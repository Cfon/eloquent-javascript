<template>
  <div id="paragraphs">
    <v-toolbar color="primary" app>
      <v-btn @click="$router.back()" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>{{ chapter.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="togglePreview" icon><v-icon>{{ preview ? 'list' : 'find_in_page' }}</v-icon></v-btn>
    </v-toolbar>
    <main>
      <v-content id="paragraphs-list">
        <div v-if="loading" class="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <v-container v-else-if="preview" id="preview" v-html="previewHTML"></v-container>
        <v-list v-else three-line>
          <template v-for="(paragraph, index) in paragraphs">
            <v-divider v-if="index !== 0" :key="paragraph._id + 'divider'" inset></v-divider>
            <v-list-tile :key="paragraph._id" :to="`/chapter/${id}/paragraph/${paragraph._id}`" avatar>
              <v-badge color="accent" :value="paragraph.unsaved" overlap>
                <span slot="badge"></span>
                <v-list-tile-avatar size="36px" class="paragraph-index primary">{{ paragraph.index + 1 }}</v-list-tile-avatar>
              </v-badge>
              <v-list-tile-content>
                <v-list-tile-title
                  v-if="paragraph.type === 'unknown'"
                  :class="{ expanded: !paragraph.tags.length }"
                >{{ paragraph.source }}</v-list-tile-title>
                <v-list-tile-title
                  v-else v-html="paragraph.html"
                  :class="{ expanded: !paragraph.tags.length }"
                />
                <v-list-tile-sub-title>
                  <v-chip class="white--text" small disabled
                    v-for="tag in paragraph.tags"
                    :key="tag._id"
                    :style="{ backgroundColor: tags[tag].color }"
                  >{{ tags[tag].title }}</v-chip>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-content>
    </main>
  </div>
</template>

<script>
  import render from '../lib/markdown'

  export default {
    data: () => ({
      id: null,       // 切换路由时 paramId 会变为 undefined, 所以要缓存一下 id
      savedScrollTop: {},
      preview: false
    }),
    computed: {
      paramId () {
        return this.$route.params.id
      },
      chapter () {
        return this.chapters[this.id] || {}
      },
      loading () {
        return !(this.chapter && !this.chapter.fetching)
      },
      paragraphs () {
        return this.chapter ? this.chapter.paragraphs : []
      },
      previewHTML () {
        if (!this.preview || !this.chapters[this.id]) return ''
        return render(this.chapter.paragraphs.map(p => p.translation || p.source).join('\n\n'))
          .trim()
          .replace('<img src="img', '<img src="https://cdn.huajingkun.com/eloquent-javascript/img')
      }
    },
    methods: {
      async fetch () {
        const el = this.$el.querySelector('#paragraphs-list')
        const listEl = el.querySelector('ul') || el.querySelector('#preview')

        if (
          listEl && (
          listEl.getBoundingClientRect().height <= window.innerHeight ||
          el.scrollTop + el.getBoundingClientRect().height > el.scrollHeight - 100
        )) {
          let scrollTop = 0
          if (this.preview) {
            scrollTop = this.$el.querySelector('.content').scrollTop
          }

          await this.fetchChapter(this.id)

          if (this.preview) {
            this.$el.querySelector('.content').scrollTo(0, scrollTop)
          }
        }
      },
      async checkChapterId () {
        await this.fetching

        if (!this.chapters[this.paramId]) {
          this.$router.replace('/chapters')
          return false
        }

        this.id = this.paramId
        return true
      },
      async routeEnter () {
        if (await this.checkChapterId()) {
          await this.fetch()
          this.$el.querySelector('.content').scrollTo(0, this.savedScrollTop[this.id] || 0)
        }
      },
      togglePreview () {
        this.preview = !this.preview
        if (this.preview) {
          this.$nextTick(() => {
            this.$el.querySelector('.content').scrollTo(0, 0)
            this.fetch()
          })
        }
      }
    },
    mounted () {
      const el = this.$el.querySelector('#paragraphs-list')
      el.addEventListener('scroll', this.fetch)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.routeEnter())
    },
    beforeRouteLeave (to, from, next) {
      if (this.preview) {
        // 等待过渡动画完成
        setTimeout(() => { this.preview = false }, 300)
        this.savedScrollTop[this.id] = 0
      } else {
        this.savedScrollTop[this.id] = this.$el.querySelector('.content').scrollTop
      }

      next()
    }
  }
</script>

<style lang="scss">
  #paragraphs {
    code {
      font-size: 14px;
      font-weight: normal;

      &.inline {
        display: inline;
      }
    }

    .paragraph-index {
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: none;
    }

    .list__tile__content {
      margin-left: 20px;
    }

    .badge__badge {
      top: 0;
      right: 0;
      width: 12px;
      height: 12px;
    }

    .expanded {
      height: auto;
      max-height: 48px;
      white-space: normal;
    }

    .loading {
      padding: 24px 0;
      display: flex;
      justify-content: center;
    }

    #preview {
      text-indent: 2em;

      .image, pre, h2, h3, blockquote {
        text-indent: 0;
      }

      .image, blockquote {
        margin-bottom: 16px;
      }

      h2 {
        font-size: 1.25em;
      }

      h3 {
        font-size: 1.15em;
      }

      pre {
        margin: 0 2em 16px;
        overflow: auto;
      }

      img {
        width: 100%;
      }

      code {
        display: inline;
      }

      blockquote {
        font-size: 1em;
        font-weight: normal;
      }
    }
  }
</style>
