<template>
  <!-- <div class="d-flex align-center w-100"> -->
  <VSelect
    v-model="mode"
    max-width="300"
    label="Servers"
    :items="serverStore.servers.map((server) => server.name)"
    @update:model-value="updateSelectedServer"
    style="margin: 20px 20px 0px 0px"
  />
  <!-- </div> -->
</template>

<script setup lang="ts">
// import AddServer from '@/components/AddServer.vue'
import { useServersStore } from '@/stores/servers.store'
import { onMounted, ref, watch } from 'vue'

const serverStore = useServersStore()

const mode = ref()

// watch(mode, () => {
//   console.log('THE MODE', mode.value)
// })

onMounted(()=>{
  if(serverStore.selectedServer?.ServerAddress){
    mode.value = serverStore.selectedServer.name
  }
})


function updateSelectedServer(serverName: string | null) {
  const server = serverStore.servers.find((s) => s.name === serverName)
  if (server) {
    serverStore.selectedServer = server
  }
}
</script>
