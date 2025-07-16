import App from '@/App.vue'
import Menu from '@/layout/Menu.vue'
import Connections from '@/views/Connections.vue'
import Subscriptions from '@/views/Subscriptions.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: App,
    },
    {
      path: '/connections',
      name: 'connections',
      component: Connections
    },
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: Subscriptions
    }
  
  ],
})

export default router
