import type { ErrorHandler } from 'hono'
import { LinkToHome } from '../components/LinkToHome'

const handler: ErrorHandler = (e, c) => {
  if ('getResponse' in e) {
    return e.getResponse()
  }
  console.error(e.message)
  c.status(500)
  return c.render(
    <div class="container">
      <p>Internal Server Error</p>
      <LinkToHome />
    </div>
  )
}

export default handler
