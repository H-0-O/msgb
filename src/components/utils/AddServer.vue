<template>
  <VDialog v-model="show" max-width="600">
    <VCard title="Add Server">
      <VCardText>
        <VRow dense>
          <VCol cols="12">
            <VSelect label="Type: " :items="types" v-model="server.ServerType" />
          </VCol>
          <VCol cols="12">
            <VTextField label="Server Name: " v-model="server.name" />
          </VCol>

          <VCol cols="12">
            <VTextField label="Server Address: " v-model="server.ServerAddress" />
          </VCol>

          <VCol cols="12">
            <VTextField label="Monitoring Address: " v-model="server.monitoringAddress" />
          </VCol>
        </VRow>
      </VCardText>
      <VDivider />
      <VCardActions>
        <VSpacer />
        <VBtn text="Close" variant="plain" @click="show = false" />
        <VBtn text="Save" variant="tonal" color="primary" @click="submit" />
      </VCardActions>
    </VCard>
  </VDialog>

  <VBtn text="add" elevation="4" @click="show = true" />
</template>

<script setup lang="ts">
import { useServersStore } from '@/stores/servers.store'
import type { Server } from '@/util/types'
import { computed, ref } from 'vue'
import type { VDialog } from 'vuetify/components'

const show = ref(false)

const server = ref<Server>({
  name: '',
  ServerType: 'Nats',
  ServerAddress: '',
  monitoringAddress: '',
})

const submit = () => {
  serversStore.servers.push({ ...server.value })
  show.value = false
}

const serversStore = useServersStore()
const types = computed(() => Object.keys(serversStore.types))
</script>
