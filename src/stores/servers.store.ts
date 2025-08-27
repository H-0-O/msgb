import type { Server } from '@/util/types'
import axios from 'axios'
import {
  StringCodec,
  connect as wsConnect,
  type ConnectionOptions,
  type NatsConnection,
  type Subscription,
} from 'nats.ws'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { destr } from 'destr'

export const useServersStore = defineStore(
  'servers',
  () => {
    const types = {
      Nats: 'Nats',
    }

    const servers = ref<Server[]>([])

    const selectedServer = ref<Server>()

    const wsServer = ref<NatsConnection>()

    const sc = StringCodec()

    watch(selectedServer, changeServer, {
      flush: 'post',
    })

    async function changeServer(newServer: Server | undefined) {
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
    }
    async function connect(options: ConnectionOptions) {
      try {
        wsServer.value = await wsConnect(options)
        console.info(`connected to ${wsServer.value.getServer()}`)
        const wwe = new URL(wsServer.value.getServer())
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

    async function request<T>(subscription: string, payload: T) {
      if (!wsServer.value) throw new Error('The connection not established')
      const _payload = typeof payload == 'string' ? payload : JSON.stringify(payload)
      try {
        const re = await wsServer.value.request(subscription, sc.encode(_payload), {
          timeout: 10000,
        })
        const decoded = sc.decode(re.data)
        return destr(decoded)
      } catch (e: any) {
        console.log(`problem with request: ${e.message}`)
        throw e
      }
    }

    return {
      servers,
      wsServer,
      types,
      selectedServer,
      subscribe,
      publish,
      request,
    }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['servers', 'selectedServer'],
    },
  },
)
