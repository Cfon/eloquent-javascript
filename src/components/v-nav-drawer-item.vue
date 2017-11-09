<template functional>
  <v-list-tile v-bind="props">
    <v-list-tile-action>
      <v-icon>{{ props.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <!-- 通过 class 和 style 设置居中，否则在手机上会有 1px 偏移 -->
      <v-list-tile-title class="layout row align-center" style="line-height: initial">
        <slot></slot>
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>
