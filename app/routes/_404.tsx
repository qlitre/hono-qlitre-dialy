import type { NotFoundHandler } from 'hono'
import { LinkToHome } from '../components/LinkToHome'

const handler: NotFoundHandler = (c) => {
  c.status(404)
  return c.render(
    <div class="container">
      <p>404 Not Found</p>
      <LinkToHome />
    </div>
  )
}

export default handler
