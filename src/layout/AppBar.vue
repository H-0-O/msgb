<script setup lang="ts">
import AddServer from '@/components/utils/AddServer.vue'
import ServersList from '@/components/utils/ServersList.vue'
import { ref } from 'vue'
import { VAppBar } from 'vuetify/components'

const showAddServers = ref(false)
</script>

<template>
  <VAppBar app elevation="20" class="p-2">
    <VAppBarTitle>MSgb</VAppBarTitle>

      <ServersList />
      <AddServer />
    <!-- <AddServer /> -->
  </VAppBar>
</template>
