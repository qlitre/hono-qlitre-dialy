import type { NotFoundHandler } from 'hono'

const handler: NotFoundHandler = (c) => {
  c.status(404)
  return c.render(
    <div class="container">
      <p>404 Not Found</p>
    </div>
  )
}

export default handler
