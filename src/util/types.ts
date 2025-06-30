export type ServerType = 'Nats'

export interface Server {
  name: string
  ServerType: ServerType
  ServerAddress: string
}
