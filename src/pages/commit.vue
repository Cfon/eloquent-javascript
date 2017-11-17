<template>
  <div id="commit" class="white">
    <v-toolbar color="primary" app>
      <v-btn @click="$router.back()" :disabled="submitting" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>提交更改</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="selectAll" icon><v-icon>select_all</v-icon></v-btn>
      <v-progress-linear v-if="submitting" color="accent" background-color="transparent" :height="2" :indeterminate="true"></v-progress-linear>
    </v-toolbar>
    <main>
      <v-content>
        <v-container>
          <v-text-field v-model="data.message" placeholder="描述更改的内容" :disabled="submitting" full-width single-line hide-details autofocus></v-text-field>
          <v-divider></v-divider>
          <v-list two-line>
            <v-list-tile v-for="chapter in chapters" v-if="chapter.unsaved" :key="chapter._id" @click="toggle(chapter._id)" :ripple="!submitting" avatar>
              <v-list-tile-action>
                <v-checkbox :input-value="data.chapters" :value="chapter._id" color="accent" :disabled="submitting"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="body-1">{{ chapter._id }}. {{ chapter.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ chapter.unsaved }} 个段落发生了更改</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-container>
      </v-content>
      <v-fab-transition>
        <v-btn v-if="!submitting && data.message.trim() && data.chapters.length" color="green" @click="submit" dark right bottom fab>
          <v-icon>check</v-icon>
        </v-btn>
      </v-fab-transition>
    </main>
  </div>
</template>

<script>
  export default {
    data: () => ({
      submitting: false,
      data: {
        message: '',
        chapters: []
      }
    }),
    methods: {
      selectAll () {
        this.data.chapters = this.chapters.filter(chapter => chapter.unsaved).map(chapter => chapter._id)
      },
      toggle (chapter) {
        if (!this.submitting) {
          const index = this.data.chapters.indexOf(chapter)
          if (index >= 0) {
            this.data.chapters.splice(index, 1)
          } else {
            this.data.chapters.push(chapter)
          }
        }
      },
      async submit () {
        this.submitting = true

        const result = (await this.$http.patch('origin', this.data)).data
        if (!result.code) {
          this.showSnackBar('提交成功')
          this.fetchData()
          this.$router.back()
        } else this.showSnackBar(`提交失败：${result.message}`)

        this.submitting = false
      }
    },
    beforeRouteLeave (to, from, next) {
      next(!this.submitting)
    }
  }
</script>
