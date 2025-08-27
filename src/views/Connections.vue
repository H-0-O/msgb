<template>
  <VDataTable :items />
</template>

<script setup lang="ts">
import { useMonitoringStore } from '@/stores/monitoring.store'
import { onMounted, ref } from 'vue'
const monitoringStore = useMonitoringStore()
const items = ref()

onMounted(async () => {
  items.value = await monitoringStore.getClientLists()

  // console.log(await serversStore.getApplicationSubscriptions())
})
</script>
