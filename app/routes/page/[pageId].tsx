import { createRoute } from 'honox/factory'
import { BLOG_PER_PAGE, config } from '../../settings/siteSettings'
import { HomeContent } from '../../components/HomeContent'
import type { MicroCMSQueries, MicroCMSListResponse } from 'microcms-js-sdk'
import type { Post, Category } from '../../types/blog'
import type { Meta } from '../../types/meta'
import { MicroCMSClient } from '../../libs/microcmsClient'

const limit = BLOG_PER_PAGE


export default createRoute(async (c) => {
    const pageId = c.req.param('pageId')
    const offset = (Number(pageId) - 1) * limit
    const client = new MicroCMSClient(c.env.SERVICE_DOMAIN, c.env.API_KEY)
    const queries: MicroCMSQueries = {
        limit: limit,
        fields: config.postListFields,
        offset: offset,
        orders: '-publishedAt'
    }
    const posts = await client.getListResponse<MicroCMSListResponse<Post>>('post', queries)
    const categories = await client.getListResponse<MicroCMSListResponse<Category>>('category')

    const totalCount = posts.totalCount
    const currentPage = Number(pageId)
    const paginationMaterial = {
        totalCount: totalCount,
        currentPage: currentPage
    }

    const meta: Meta = {
        title: config.siteTitle,
        description: config.siteDescription,
        canonicalUrl: config.siteURL,
        ogpType: 'website' as const,
        ogpUrl: config.siteURL
    }
    return c.render(
        <HomeContent posts={posts.contents} categories={categories.contents} paginationMaterial={paginationMaterial} />,
        { meta }
    )
})
