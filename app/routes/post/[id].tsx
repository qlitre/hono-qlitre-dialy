import { createRoute } from 'honox/factory'
import { MicroCMSClient } from '../../libs/microcmsClient'
import type { Post } from '../../types/blog'
import type { Meta } from '../../types/meta'
import { config } from '../../settings/siteSettings'
import { DetailContent } from '../../components/DetailContent'

export default createRoute(async (c) => {
    const { id } = c.req.param()
    const serviceDomain = c.env.SERVICE_DOMAIN
    const apiKey = c.env.API_KEY
    const client = new MicroCMSClient(serviceDomain, apiKey)
    const post = await client.getDetail<Post>('post', id)
    if (!post) return
    const contentUrl = config.siteURL + `/post/${id}`
    const meta: Meta = {
        title: post.title,
        description: post.description,
        canonicalUrl: contentUrl,
        ogpType: 'article' as const,
        ogpImage: post.thumbnail?.url,
        ogpUrl: contentUrl
    }
    return c.render(
        <DetailContent post={post} />, { meta }
    )
})