import { createRoute } from 'honox/factory'
import { BLOG_PER_PAGE, config } from '../../../../settings/siteSettings'
import { HomeContent } from '../../../../components/HomeContent'
import type { MicroCMSQueries, MicroCMSListResponse } from 'microcms-js-sdk'
import type { Post, Category } from '../../../../types/blog'
import type { Meta } from '../../../../types/meta'
import { MicroCMSClient } from '../../../../libs/microcmsClient'

const limit = BLOG_PER_PAGE


export default createRoute(async (c) => {
    const categoryId = c.req.param('categoryId')
    const pageId = c.req.param('pageId')
    const offset = (Number(pageId) - 1) * limit
    const client = new MicroCMSClient(c.env.SERVICE_DOMAIN, c.env.API_KEY)
    const queries: MicroCMSQueries = {
        filters: `category[equals]${categoryId}`,
        limit: limit,
        fields: config.postListFields,
        offset: offset
    }
    const posts = await client.getListResponse<MicroCMSListResponse<Post>>('post', queries)
    const categories = await client.getListResponse<MicroCMSListResponse<Category>>('category')
    const categoryDetail = categories.contents.find(category => category.id === categoryId)

    const totalCount = posts.totalCount
    const currentPage = Number(pageId)
    const paginationMaterial = {
        totalCount: totalCount,
        currentPage: currentPage,
        categoryId: categoryId,
    }

    const meta: Meta = {
        title: config.siteTitle,
        description: config.siteDescription,
        canonicalUrl: config.siteURL,
        ogpType: 'website' as const,
        ogpUrl: config.siteURL
    }
    return c.render(
        <HomeContent posts={posts.contents} categories={categories.contents} paginationMaterial={paginationMaterial} category={categoryDetail} />,
        { meta }
    )
})
