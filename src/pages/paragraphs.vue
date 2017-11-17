<template>
  <div id="paragraphs">
    <v-toolbar color="primary" app>
      <v-btn @click="$router.back()" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>{{ chapter.title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content id="paragraphs-list">
        <v-list three-line>
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
        <div v-if="loading" class="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </v-content>
    </main>
  </div>
</template>

<script>
  export default {
    data: () => ({
      id: null,       // 切换路由时 paramId 会变为 undefined, 所以要缓存一下 id
      savedScrollTop: {}
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
      }
    },
    methods: {
      async fetch () {
        const el = this.$el.querySelector('#paragraphs-list')
        const contentEl = el.querySelector('ul')

        if (
          contentEl.getBoundingClientRect().height <= window.innerHeight ||
          el.scrollTop + el.getBoundingClientRect().height > el.scrollHeight - 100
        ) {
          return this.fetchChapter(this.id)
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
      this.savedScrollTop[this.id] = this.$el.querySelector('.content').scrollTop
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
  }
</style>
