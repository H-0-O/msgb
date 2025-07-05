<template>


</template>

<script setup lang="ts">
import { useServersStore } from '@/stores/servers';
import { onMounted } from 'vue';
const serversStore = useServersStore();

onMounted(async ()=>{
    console.log(await serversStore.getNumberOfClients());
    console.log(await serversStore.getApplicationSubscriptions());
    
})
</script>