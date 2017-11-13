<template>
  <v-app id="paragraph" light>
    <v-toolbar color="primary" app>
      <v-btn @click="$router.back()" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>{{ chapter.title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container>
          <div class="card-title">原文</div>
          <v-card>
            <v-card-title v-html="data.source.html"></v-card-title>
          </v-card>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      data: {
        source: {},
        translation: {}
      },
      loading: false,
      notFound: false,
      chapterId: null,
      paragraphId: null
    }),
    computed: {
      chapter () {
        return this.chapters[this.chapterId] || {}
      }
    },
    methods: {
      async fetch () {
        this.loading = true

        await this.fetching
        const renderHTML = (await import(/* webpackChunkName: "markdown" */ '../lib/paragraph')).default
        const { data } = await this.$http.get(`/chapter/${this.chapterId}/paragraph/${this.paragraphId}`)

        if (data) {
          data.source = {
            original: data.source,
            ...(await renderHTML(data.source))
          }

          data.translation = {
            original: data.translation,
            ...(await renderHTML(data.translation))
          }

          this.data = data
        } else {
          this.notFound = true
        }

        this.loading = false
      },
      updateIds (params = this.$route.params) {
        this.chapterId = params.chapterId
        this.paragraphId = params.paragraphId
        this.fetch()
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.updateIds())
    },
    beforeRouteUpdate (to, from, next) {
      next()
      this.updateIds(to.params)
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
  }
</style>
