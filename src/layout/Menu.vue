<template>
    <v-navigation-drawer permanent>
      <v-list nav dense>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.to" link>
          <template #prepend>
            <VIcon :icon="item.icon"></VIcon>
          </template>
          <!-- <v-list-item-content> -->
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          <!-- </v-list-item-content> -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { VIcon } from 'vuetify/components'

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/admin/dashboard' },
  { title: 'Connections', icon: 'mdi-connection', to: '/connections' },
  { title: 'Subscriptions', icon: 'mdi-satellite-uplink', to: '/subscriptions' },
  // { title: 'Settings', icon: 'mdi-cog', to: '/admin/settings' },
]
</script>
