import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useServersStore } from './servers'
import axios from 'axios'
import type { NatsConnectionReport, NatsSubscriptionReport, Server } from '@/util/types'

export const useMonitoringStore = defineStore('monitoring', () => {
  const serverStore = useServersStore()

  watch(() => serverStore.selectedServer, changeServer , {flush: 'post'})

  onMounted(async () => {
    if (serverStore.selectedServer) {
      await changeServer(serverStore.selectedServer)
    }
  })
  async function changeServer(newVal: Server | undefined) {
    if (!newVal) return

    try {
      if (!newVal.monitoringAddress) return
      console.info('Changing Monitor Store')

      axios.defaults.baseURL = newVal.monitoringAddress

      console.info(`Connect to Monitoring ${newVal.monitoringAddress} `)
    } catch (error) {
      console.error(`Can't connect to Monitoring Address ${newVal.monitoringAddress}`)
      throw error
    }
  }

  async function getClientLists() {
    const res = await axios.get<NatsConnectionReport>('/connz')

    console.log(`Total clients connected: ${res.data.num_connections}`)
    return res.data.connections
  }

  async function getSubscriptions() {
    const res = await axios.get<NatsSubscriptionReport>('/subsz?subs=1')
    // const data = await res.json()
    const data = res.data;

    console.log("THE DATA" , data);
    
    // define known system patterns to filter out
    const systemPrefixes = ['_INBOX.', '_SYS.', '$JS.', '$SYS.']

    const appSubs = data.subscriptions_list.filter((sub: any) => {
      return !systemPrefixes.some((prefix) => sub.subject.startsWith(prefix))
    })

    // console.log(`Application subscriptions: ${appSubs.length}`)
    // appSubs.forEach((sub: any) => {
    //   console.log(`subject: ${sub.subject} (client id: ${sub.cid})`)
    // })
    return appSubs
  }

  return {
    getClientLists,
    getSubscriptions,
  }
})
