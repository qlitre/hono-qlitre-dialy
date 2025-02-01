import { createRoute } from 'honox/factory'
import { config } from '../settings/siteSettings'
import type { MicroCMSQueries, MicroCMSListResponse } from 'microcms-js-sdk'
import type { Post } from '../types/blog'
import type { Meta } from '../types/meta'
import { MicroCMSClient } from '../libs/microcmsClient'
import { ArticleList } from '../components/ArticleList'
import { Breadcrumbs } from '../components/Breadcrumbs'

const limit = 30

export default createRoute(async (c) => {
    const client = new MicroCMSClient(c.env.SERVICE_DOMAIN, c.env.API_KEY)
    const keyword = c.req.query('q') || ''
    const queries: MicroCMSQueries = {
        limit: limit,
        fields: config.postListFields,
        q: keyword
    }
    const posts = await client.getListResponse<MicroCMSListResponse<Post>>('post', queries)

    const meta: Meta = {
        title: config.siteTitle,
        description: config.siteDescription,
        canonicalUrl: config.siteURL,
        ogpType: 'website' as const,
        ogpUrl: config.siteURL
    }


    return c.render(
        <>
            <div class="container">
                <Breadcrumbs keyword={keyword}></Breadcrumbs>
                <ArticleList posts={posts.contents}></ArticleList>
            </div>
        </>, { meta }
    )
})
