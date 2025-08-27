<template>
  <VContainer fluid class="h-screen pa-0">
    <VCard variant="tonal" class="d-flex flex-column h-screen">
      <VCardTitle class="d-flex flex-col gap-2 pa-1">
        <div class="d-flex gap-2 items-center">
          <VBtn text="Publish" @click="publish" variant="elevated" />
          <VBtn text="Request/Reply" @click="request" variant="elevated" />
          <VSwitch
            label="Save sent data"
            hint="Enable to persist messages to storage"
            color="indigo"
            v-model="editorStore.persistEnable"
            hide-details
          />
        </div>
        <v-autocomplete
          chips
          label="Autocomplete"
          :items
          autocomplete="none"
          v-model="selectedItem"
        />
      </VCardTitle>
      <VCardText class="d-flex gap-2 flex-grow-1 pa-1">
        <JsonEditorVue
          class="jse-theme-dark flex-grow-1 w-100"
          :mode="Mode.text"
          v-model="editorStore.getEditor(dataToSendKey).data"
        />
        <JsonEditorVue class="jse-theme-dark flex-grow-1 w-100" v-model="receivedData" />
      </VCardText>
    </VCard>
  </VContainer>

  <VSnackbar v-model="showError" color="red" location="top">
    {{ errorMessage }}
  </VSnackbar>
</template>

<script setup lang="ts">
import { useMonitoringStore } from '@/stores/monitoring.store'
import { useServersStore } from '@/stores/servers.store'
import { onBeforeMount, onMounted, ref } from 'vue'
import JsonEditorVue from 'json-editor-vue'
import { getErrorMessageOrDefault } from '@/helper'
import { useEditorStore } from '@/stores/editor.store'
import { Mode } from 'vanilla-jsoneditor'

const serversStore = useServersStore()
const monitoringStore = useMonitoringStore()
const editorStore = useEditorStore()
const items = ref()
const receivedData = ref()
const selectedItem = ref()
const showError = ref(false)
const errorMessage = ref()

const dataToSendKey = 'DATA_TO_SEND_KEY'

editorStore.createInstance(dataToSendKey)

onMounted(async () => {
  console.log('THE VAL', editorStore.instances)

  items.value = (await monitoringStore.getSubscriptions()).map((sub) => sub.subject)
})

async function publish() {
  try {
    await serversStore.publish(selectedItem.value, editorStore.getEditor(dataToSendKey).data)
  } catch (error) {
    errorMessage.value = getErrorMessageOrDefault(error)
    showError.value = true
  }
}

async function request() {
  try {
    receivedData.value = await serversStore.request(
      selectedItem.value,
      editorStore.getEditor(dataToSendKey).data,
    )
  } catch (error) {
    errorMessage.value = getErrorMessageOrDefault(error)
    showError.value = true
  }
}
</script>

<style>
@import 'vanilla-jsoneditor/themes/jse-theme-dark.css';
</style>
