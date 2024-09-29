import { createRoute } from 'honox/factory'
import { BLOG_PER_PAGE, config } from '../../../../settings/siteSettings'
import { HomeContent } from '../../../../components/HomeContent'
import type { MicroCMSQueries, MicroCMSListResponse } from 'microcms-js-sdk'
import type { Post, Category } from '../../../../types/blog'
import type { Meta } from '../../../../types/meta'
import { MicroCMSClient } from '../../../../libs/microcmsClient'

const limit = BLOG_PER_PAGE


export default createRoute(async (c) => {
    /**
     *  const queries: MicroCMSQueries = {
        filters: `category[equals]${categoryId}`,
        offset: (Number(pageId) - 1) * limit,
        limit: limit,
        fields: config.postListFields
    }
    const posts = await client.getList<Post>({ endpoint: 'post', queries: queries })
    const categories = await client.getList<Category>({ endpoint: 'category' })
    const categoryDetail = categories.contents.find(category => category.id === categoryId)
    const props = {
        posts: posts.contents,
        categories: categories.contents,
        paginationMaterial: {
            totalCount: posts.totalCount,
            currentPage: Number(pageId),
            categoryId: categoryId,
        },
        category: categoryDetail,
        siteData: {
            title: config.siteTitle,
            description: config.siteDescription,
            canonicalUrl: config.siteURL,
            ogpType: "website" as const,
            ogpUrl: config.siteURL,
        },
    }
     */
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
    if (!posts) return
    const categories = await client.getListResponse<MicroCMSListResponse<Category>>('category')
    if (!categories) return
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
        <>
            <HomeContent posts={posts.contents} categories={categories.contents} paginationMaterial={paginationMaterial} category={categoryDetail} />
        </>, { meta }
    )
})
