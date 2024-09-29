import { createRoute } from 'honox/factory'
import { MicroCMSClient } from '../../../../libs/microcmsClient'
import type { Post } from '../../../../types/blog'
import { DetailContent } from '../../../../components/DetailContent'

export default createRoute(async (c) => {
    const { id } = c.req.param()
    const draftKey = c.req.query('draftKey')
    const serviceDomain = c.env.SERVICE_DOMAIN
    const apiKey = c.env.API_KEY
    const client = new MicroCMSClient(serviceDomain, apiKey)
    const queries = { draftKey: draftKey }
    const post = await client.getDetail<Post>('post', id, queries)
    if (!post) return

    return c.render(
        <DetailContent post={post} />
    )
})