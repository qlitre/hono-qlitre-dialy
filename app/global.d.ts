import { } from 'hono'
import type { Meta } from './types/meta'

type Head = {
  meta: Meta
}

type Bindings = {
  API_KEY: string
  SERVICE_DOMAIN: string
}

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: Bindings
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
