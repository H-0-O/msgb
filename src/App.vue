<script setup lang="ts">
import Menu from './layout/menu.vue'
import { useServersStore } from './stores/servers';
useServersStore();
</script>

<template>
  <VApp>
    <Menu />
    <RouterView />
  </VApp>
</template>

<style scoped></style>
