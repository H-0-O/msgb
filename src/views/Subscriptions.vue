<template>
  <!-- <VDataTable :items /> -->
  <VContainer>
    <VCard variant="tonal">
      <VCardTitle>
        <!-- <VCombobox
          v-model="subject"
          variant="solo"
          label="Search for Subject"
          multiple
          hide-selected
          persistent-hint
          :items
          item-title="subject"
          item-value="subject"
        /> -->

      </VCardTitle>
      <VCardText> dff </VCardText>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { useMonitoringStore } from '@/stores/monitoring'
import { onMounted, ref } from 'vue'

const monitoringStore = useMonitoringStore()
const items = ref()
const subject = ref()

onMounted(async () => {
  items.value = await monitoringStore.getSubscriptions()
  console.log('THE ITEMS', items.value)
})
</script>
