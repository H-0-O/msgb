<template>
  <VDialog v-model="$props.show" max-width="600">
    <VCard title="Add Server">
      <VCardText>
        <VRow dense>
          <VCol cols="12">
            <VSelect label="Type: " :items="types" v-model="server.ServerType"/>
          </VCol>
          <VCol cols="12">
            <VTextField label="Server Name: " v-model="server.name"/>
          </VCol>

          <VCol cols="12">
            <VTextField label="Server Address: " v-model="server.ServerAddress"/>
          </VCol>
        </VRow>
      </VCardText>
      <VDivider />
      <VCardActions>
        <VSpacer />
        <VBtn text="Close" variant="plain" @click="closeDialog"/>
        <VBtn text="Save" variant="tonal" color="primary"  @click="submit"/>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useServersStore } from '@/stores/servers'
import type { Server, ServerType } from '@/util/types';
import type { Connect } from '@nats-io/transport-node';
import { computed, ref } from 'vue'
import type { VDialog } from 'vuetify/components'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const closeDialog = () => {
  emit('update:show', false)
}

// const type = ref<ServerType>("Nats")
// const name = ref<string>("")
// const address = ref<string>("")
const server = ref<Server>({
  name: '', 
  ServerType: 'Nats', 
  ServerAddress: ''
})

const submit = () => {
  serversStore.servers.push({...server.value})
  emit('update:show', false)
}

const serversStore = useServersStore()
const types = computed(() => Object.keys(serversStore.types))
</script>
