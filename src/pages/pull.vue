<template>
  <div id="pull" class="white">
    <v-toolbar color="primary" app>
      <v-btn @click="$router.back()" :disabled="submitting" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>合并更改</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-linear v-if="submitting" color="accent" background-color="transparent" :height="2" :indeterminate="true"></v-progress-linear>
    </v-toolbar>
    <main>
      <v-content>
        <v-container>
          <v-text-field v-model="data.message" placeholder="描述合并的内容" :disabled="submitting" full-width single-line hide-details autofocus></v-text-field>
          <v-divider></v-divider>
          <v-list two-line>
            <v-list-tile v-for="commit in commitsBehind" :key="commit.hash" :href="'https://github.com/marijnh/Eloquent-JavaScript/commit/' + commit.hash" target="_blank" ripple>
              <v-list-tile-content>
                <v-list-tile-title class="body-1">{{ commit.message }}</v-list-tile-title>
                <v-list-tile-sub-title class="hash">{{ commit.hash.slice(0, 8) }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-container>
      </v-content>
      <v-fab-transition>
        <v-btn v-if="!submitting && data.message.trim()" color="green" @click="submit" dark right bottom fab>
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
        message: '合并远程更改'
      }
    }),
    methods: {
      async submit () {
        this.submitting = true

        const result = await this.$http.patch('local', this.data)
        if (!result.code) {
          this.showSnackBar('合并成功')
          this.fetchData()
          this.$router.back()
        } else this.showSnackBar(`合并失败：${result.message}`)

        this.submitting = false
      }
    },
    beforeRouteLeave (to, from, next) {
      next(!this.submitting)
    }
  }
</script>

<style lang="scss">
  #pull {
    .hash {
      font-family: Inconsolata, monospace;
    }
  }
</style>
