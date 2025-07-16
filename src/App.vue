<script setup lang="ts">
import AppBar from './layout/AppBar.vue';
import Menu from './layout/Menu.vue'
import { useServersStore } from './stores/servers'
useServersStore()
</script>

<template>
  <VApp>
    <VLayout>
      <Menu />
      <AppBar />
    <v-main class="mt-8">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    </VLayout>
  </VApp>
</template>

<style >
@import "tailwindcss" important;
</style>
