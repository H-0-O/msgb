export type ServerType = 'Nats'

export interface Server {
  name: string
  ServerType: ServerType
  ServerAddress: string
  monitoringAddress?: string
}



export interface NatsConnectionReport {
  server_id: string;
  now: string;
  num_connections: number;
  total: number;
  offset: number;
  limit: number;
  connections: NatsConnection[];
}

export interface NatsConnection {
  cid: number;
  kind: string;
  type: string;
  ip: string;
  port: number;
  start: string;
  last_activity: string;
  rtt: string;
  uptime: string;
  idle: string;
  pending_bytes: number;
  in_msgs: number;
  out_msgs: number;
  in_bytes: number;
  out_bytes: number;
  subscriptions: number;
}


export interface NatsSubscriptionReport {
  server_id: string;
  now: string;
  num_subscriptions: number;
  num_cache: number;
  num_inserts: number;
  num_removes: number;
  num_matches: number;
  cache_hit_rate: number;
  max_fanout: number;
  avg_fanout: number;
  total: number;
  offset: number;
  limit: number;
  subscriptions_list: Subscription[];
}

export interface Subscription {
  account: string;
  account_tag: string;
  subject: string;
  sid: string;
  msgs: number;
  cid: number;
}