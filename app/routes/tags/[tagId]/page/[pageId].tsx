import { createRoute } from 'honox/factory'
import { BLOG_PER_PAGE, config } from '../../../../settings/siteSettings'
import { HomeContent } from '../../../../components/HomeContent'
import type { MicroCMSQueries, MicroCMSListResponse } from 'microcms-js-sdk'
import type { Post, Category, Tag } from '../../../../types/blog'
import type { Meta } from '../../../../types/meta'
import { MicroCMSClient } from '../../../../libs/microcmsClient'

const limit = BLOG_PER_PAGE

export default createRoute(async (c) => {
    const tagId = c.req.param('tagId')
    const pageId = c.req.param('pageId')
    const offset = (Number(pageId) - 1) * limit
    const client = new MicroCMSClient(c.env.SERVICE_DOMAIN, c.env.API_KEY)
    const queries: MicroCMSQueries = {
        filters: `tag[contains]${tagId}`,
        limit: limit,
        fields: config.postListFields,
        offset: offset
    }
    const posts = await client.getListResponse<MicroCMSListResponse<Post>>('post', queries)
    if (!posts) return
    const categories = await client.getListResponse<MicroCMSListResponse<Category>>('category')
    if (!categories) return
    const tagDetail = await client.getDetail<Tag>('tag', tagId)
    if (!tagDetail) return
    const totalCount = posts.totalCount
    const currentPage = Number(pageId)
    const paginationMaterial = {
        totalCount: totalCount,
        currentPage: currentPage,
        tagId: tagId
    }

    const meta: Meta = {
        title: config.siteTitle,
        description: config.siteDescription,
        canonicalUrl: config.siteURL,
        ogpType: 'website' as const,
        ogpUrl: config.siteURL
    }
    return c.render(
        <HomeContent posts={posts.contents} categories={categories.contents} paginationMaterial={paginationMaterial} tag={tagDetail} />,
        { meta }
    )
})
