<template>
  <div id="overview">
    <v-toolbar color="primary" app>
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="$emit('open-drawer')"></v-toolbar-side-icon>
      <v-toolbar-title>总览</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center>
            <v-index-card title="进度" icon="book">
              <v-card-text class="big-number">{{ progress }}%</v-card-text>
            </v-index-card>
            <v-index-card title="仓库" icon="octicons-repo">
              <v-card-text class="git-repo-status">
                <span class="big-number">{{ commitsBehind.length }}</span>
                <v-icon color="black">arrow_downward</v-icon>
                <span class="big-number">{{ unsavedCount }}</span>
                <v-icon color="black">arrow_upward</v-icon>
              </v-card-text>
              <v-divider v-if="authToken && (behind || ahead)"></v-divider>
              <v-card-actions v-if="authToken && (behind || ahead)">
                <v-btn v-if="ahead" flat color="accent" @click="$router.push('/commit')">提交更改</v-btn>
                <v-btn v-if="behind" flat color="accent" @click="$router.push('/pull')">合并更改</v-btn>
              </v-card-actions>
            </v-index-card>
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </div>
</template>

<script>
  export default {
    computed: {
      behind () {
        return !!this.commitsBehind.length
      },
      ahead () {
        return !!this.unsavedCount
      },
      progress () {
        const data = this.chapters.reduce((result, chapter) => {
          result.passed += chapter.passed
          result.total += chapter.paragraphsCount
          return result
        }, { passed: 0, total: 0 })

        return Math.round(data.passed / (data.total || 1) * 1000) / 1000
      }
    }
  }
</script>

<style lang="scss">
  #overview {
    .big-number {
      font-size: 34px;
      font-weight: 300;
      line-height: 40px;
      text-align: center;

      &:first-child {
        padding-left: 8px;
      }
    }

    .git-repo-status {
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        margin: 0 20px 0 4px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
