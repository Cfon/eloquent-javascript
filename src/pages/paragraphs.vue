<template>
  <v-app id="paragraphs" light>
    <v-toolbar color="primary" app>
      <v-btn @click="$router.back()" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>{{ chapter.title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-list three-line>
          <template v-for="(paragraph, index) in paragraphs">
            <v-divider v-if="index !== 0" :key="paragraph._id + 'divider'" inset></v-divider>
            <v-list-tile :key="paragraph._id" avatar>
              <v-badge color="accent" :value="paragraph.unsaved" overlap>
                <span slot="badge"></span>
                <v-list-tile-avatar size="36px" class="paragraph-index primary">{{ paragraph.index + 1 }}</v-list-tile-avatar>
              </v-badge>
              <v-list-tile-content>
                <v-list-tile-title :class="{ expanded: !paragraph.tags.length }">{{ paragraph.source }}</v-list-tile-title>
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
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      id: null,       // 切换路由时 paramId 会变为 undefined, 所以要缓存一下 id
      page: 0,
      count: -1,
      paragraphs: []
    }),
    computed: {
      paramId () {
        return this.$route.params.id
      },
      chapter () {
        return this.chapters[this.id] || {}
      },
      pages () {
        return Math.ceil(this.count / 10)
      }
    },
    methods: {
      async fetch () {
        if (this.count === -1 || this.page < this.pages) {
          const url = `chapter/${this.id}/paragraphs/${++this.page}`
          const { items, count } = (await this.$http.get(url)).data

          this.count = count
          this.paragraphs = this.paragraphs.concat(items)
        }
      },
      async checkChapterId () {
        await this.fetching

        if (!this.chapters[this.paramId]) {
          this.$router.replace('/chapters')
          return false
        }

        // checkChapterId 只在路由进入时调用,
        // 所以在这里加入一些初始化代码
        this.id = this.paramId
        this.paragraphs = []
        this.page = 0
        return true
      }
    },
    beforeRouteEnter (to, from, next) {
      next(async vm => {
        vm.checkChapterId().then(result => result && vm.fetch())
      })
    }
  }
</script>

<style lang="scss">
  #paragraphs {
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
  }
</style>
