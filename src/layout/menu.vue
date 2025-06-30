<template>
  <VAppBar class="d-flex">
    <VAppBarTitle style="width: 100px">MSgb</VAppBarTitle>
    <div class="w-100 d-flex flex-row align-center" style="gap: 20px; margin: 0 20px">
      <RouterLink to="/"> Home </RouterLink>
      <div class="d-flex align-center w-100">
        <VSelect max-width="300" label="Servers" :items="serverStore.servers.map(server=>server.name)" style="margin: 20px 20px 0px 0px;"/>
        <VBtn text="add" elevation="4" @click="showAddServers = true"/>
      </div>
    </div>
  </VAppBar>

  <AddServer v-model:show="showAddServers" />
</template>

<script setup lang="ts">
import AddServer from '@/components/AddServer.vue'
import { useServersStore } from '@/stores/servers'
import { ref } from 'vue'
import { VAppBarTitle } from 'vuetify/components'

const serverStore = useServersStore()


console.log()

const showAddServers = ref(false)
</script>
