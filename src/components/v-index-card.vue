<template functional>
  <v-flex xs12 lg8>
    <v-card class="index-card">
      <v-card-title>
        <v-layout align-center>
          <v-flex class="card-title-icon-wrapper">
            <v-icon class="card-title-icon">{{ props.icon }}</v-icon>
          </v-flex>
          <v-flex><span class="card-title-text">{{ props.title }}</span></v-flex>
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

    .card-title-icon-wrapper {
      width: 32px;
      padding-right: 0 !important;
      display: flex;
      justify-content: center;
      flex: none;
    }

    .card-title-icon {
      font-size: 16px;
    }

    .card-title-text {
      font-weight: 500;
    }
  }
</style>
