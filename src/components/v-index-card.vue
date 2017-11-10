<template functional>
  <v-flex xs12 lg8>
    <v-card class="index-card">
      <v-card-title>
        <v-layout align-center style="margin: 0">
          <v-flex class="card-title-icon-wrapper">
            <v-icon class="card-title-icon">{{ props.icon }}</v-icon>
          </v-flex>
          <v-flex>
            <span class="card-title-text subheading">{{ props.title }}</span>
          </v-flex>
          <v-spacer v-if="slots.titleRight"></v-spacer>
          <slot name="title-right"></slot>
        </v-layout>
      </v-card-title>
      <slot></slot>
    </v-card>
  </v-flex>
</template>

<style lang="scss">
  .index-card {
    .card__title {
      padding-bottom: 0;
    }

    .flex {
      display: flex;
      align-items: center;
      padding: 0 !important;
    }

    .card-title-icon-wrapper {
      width: 24px;
      height: 24px;
      padding-right: 0 !important;
      padding-bottom: 0 !important;
      justify-content: center;
      flex: none;
    }

    .card-title-text {
      padding-left: 12px;
      line-height: 1;
    }
  }
</style>
