<template>
  <div id="token" class="white">
    <v-toolbar color="primary" app>
      <v-btn @click="$router.back()" :disabled="submitting" icon><v-icon>arrow_back</v-icon></v-btn>
      <v-toolbar-title>授权设置</v-toolbar-title>
      <v-toolbar-loading></v-toolbar-loading>
    </v-toolbar>
    <main>
      <v-content>
        <v-container>
          <div class="section-title">授权码</div>
          <textarea placeholder="在此输入授权码（留空则清空授权码）" rows="10" v-model="token"></textarea>
        </v-container>
      </v-content>
      <v-fab-transition>
        <v-btn v-if="!submitting" color="green" @click="submit" dark right bottom fab>
          <v-icon>check</v-icon>
        </v-btn>
      </v-fab-transition>
    </main>
  </div>
</template>

<script>
  export default {
    data: () => ({
      token: '',
      submitting: false
    }),
    methods: {
      async submit () {
        this.submitting = true

        if (await this.setToken(this.token)) {
          this.showSnackBar('授权修改成功')
          this.$router.back()
        } else {
          this.showSnackBar('授权修改失败：无效的授权码')
        }

        this.submitting = false
      }
    },
    mounted () {
      this.token = this.authToken
    },
    beforeRouteLeave (to, from, next) {
      next(!this.submitting)
    }
  }
</script>

<style lang="scss">
  #token {
    .section-title {
      margin-bottom: 8px;
      font-size: 14px;
      color: #616161;
    }

    textarea {
      width: 100%;
      display: block;
      font-family: Inconsolata, 'PingFang SC', 'Microsoft YaHei', monospace;
      font-size: 14px;
      resize: none;
      outline: none;
    }

    .btn--floating {
      position: absolute;
    }
  }
</style>
