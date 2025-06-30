import type { Server } from '@/util/types';
import {
  StringCodec,
  connect as wsConnect,
  type ConnectionOptions,
  type NatsConnection,
  type Subscription,
} from 'nats.ws'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useServersStore = defineStore('servers', () => {
  const types = {
    Nats: "Nats"
  };
  
  const servers = ref<Server[]>([]);

  const wsServers = ref<NatsConnection>()
  const sc = StringCodec()

  async function connect(options: ConnectionOptions) {
    wsServers.value = await wsConnect(options)
    console.log(`connected to ${wsServers.value.getServer()}`)
  }

  async function subscribe(subscription: string) {
    if (!wsServers.value) throw new Error('The connection not established')
    const sub = wsServers.value.subscribe(subscription)
    listener(sub)
  }

  async function listener(sub: Subscription) {
    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`)
    }
    console.log('subscription closed')
  }

  async function publish<T>(subscription: string, payload: T) {
    if (!wsServers.value) throw new Error('The connection not established')
    const _payload = typeof payload == 'string' ? payload : JSON.stringify(payload)
    wsServers.value.publish(subscription, sc.encode(_payload))
  }

  return {
    servers,
    wsServers,
    types,
    connect,
    subscribe,
    publish
  }
})
