import type { Server } from '@/util/types'
import {
  StringCodec,
  connect as wsConnect,
  type ConnectionOptions,
  type NatsConnection,
  type Subscription,
} from 'nats.ws'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useServersStore = defineStore(
  'servers',
  () => {
    const types = {
      Nats: 'Nats',
    }

    const servers = ref<Server[]>([])

    const selectedServer = ref<Server>({} as Server)

    const wsServer = ref<NatsConnection>()

    const sc = StringCodec()

    watch(
      selectedServer,
      async (newServer) => {
        console.info('Server changed')

        if (newServer == undefined) return

        console.info('Changing server to:', newServer.ServerAddress)

        if (wsServer.value != undefined) {
          console.info('Disconnecting from server:', wsServer.value.getServer())

          //kill the previous connection
          await wsServer.value.drain()
        }
        console.info('Connecting to server:', newServer.ServerAddress)

        await connect({
          servers: newServer?.ServerAddress,
          timeout: 1000,
        })
      },
      {
        flush: 'post',
      },
    )

    async function connect(options: ConnectionOptions) {
      try {
        wsServer.value = await wsConnect(options)
        console.info(`connected to ${wsServer.value.getServer()}`)
      } catch (error) {
        console.error(`Can not connect to server ${options.servers?.[0]}: `, error)
      }
    }

    async function subscribe(subscription: string) {
      if (!wsServer.value) throw new Error('The connection not established')
      const sub = wsServer.value.subscribe(subscription)
      listener(sub)
    }

    async function listener(sub: Subscription) {
      for await (const m of sub) {
        console.info(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`)
      }
      console.info('subscription closed')
    }

    async function publish<T>(subscription: string, payload: T) {
      if (!wsServer.value) throw new Error('The connection not established')
      const _payload = typeof payload == 'string' ? payload : JSON.stringify(payload)
      wsServer.value.publish(subscription, sc.encode(_payload))
    }

    async function getNumberOfClients() {
      const res = await fetch('http://localhost:8222/connz')
      const data = await res.json()
      console.log(`Total clients connected: ${data.num_connections}`)
    }

    async function getApplicationSubscriptions() {
      const res = await fetch('http://localhost:8222/subsz?subs=1')
      const data = await res.json()

      // define known system patterns to filter out
      const systemPrefixes = ['_INBOX.', '_SYS.', '$JS.', '$SYS.']

      const appSubs = data.subscriptions_list.filter((sub: any) => {
        return !systemPrefixes.some((prefix) => sub.subject.startsWith(prefix))
      })

      console.log(`Application subscriptions: ${appSubs.length}`)
      appSubs.forEach((sub: any) => {
        console.log(`subject: ${sub.subject} (client id: ${sub.cid})`)
      })
    }

    return {
      servers,
      wsServer,
      types,
      selectedServer,
      subscribe,
      publish,
      getNumberOfClients,
      getApplicationSubscriptions,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['servers', 'selectedServer'],
    },
  },
)
