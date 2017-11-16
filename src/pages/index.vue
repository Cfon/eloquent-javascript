<template>
  <div id="index">
    <v-toolbar color="primary" app>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="$emit('open-drawer')"></v-toolbar-side-icon>
      <transition name="fade" mode="in-out">
        <v-toolbar-title v-if="showTitle">{{ title }}</v-toolbar-title>
      </transition>
    </v-toolbar>
    <main>
      <v-content>
        <transition name="fade" mode="in-out">
          <router-view class="page"></router-view>
        </transition>
      </v-content>
    </main>
  </div>
</template>

<script>
  import { titleEvent } from 'mixins/index-title'

  export default {
    data: () => ({
      title: 'Eloquent JavaScript',
      showTitle: true
    }),
    mounted () {
      titleEvent.$on('routeEnter', title => {
        this.title = title
        this.showTitle = true
      })

      titleEvent.$on('routeLeave', () => { this.showTitle = false })
      titleEvent.$on('titleChanged', title => { this.title = title })
    },
    beforeRouteEnter (to, from, next) {
      if (to.path === '/') {
        next(vm => vm.$router.replace('/overview'))
      } else {
        next()
      }
    }
  }
</script>
