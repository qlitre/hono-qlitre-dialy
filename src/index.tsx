import { Hono } from 'hono'
import type { MicroCMSQueries } from 'microcms-js-sdk';
import { serveStatic } from 'hono/cloudflare-workers'
import { createClient } from 'microcms-js-sdk'
import { Post, Category, Tag } from './types/blog'
import { HomeContent, DetailContent } from './layout'
import { BLOG_PER_PAGE } from './settings/siteSettings';
import { config } from './settings/siteSettings'

type Bindings = {
    API_KEY: string
    SERVICE_DOMAIN: string
}

const app = new Hono<{ Bindings: Bindings }>()
const limit = BLOG_PER_PAGE

app.use('/static/*', serveStatic({ root: './' }))
app.use('/sitemap.xml', serveStatic({ path: './sitemap.xml' }))
app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
app.use('/ads.txt', serveStatic({ path: './ads.txt' }))

/**
 * トップページ
 */
app.get('/', async (c) => {
    const client = createClient({
        serviceDomain: c.env.SERVICE_DOMAIN,
        apiKey: c.env.API_KEY,
    })
    const listData = await client.getList<Post>({ endpoint: 'post' })
    const posts = listData.contents
    const props = {
        posts: posts,
        paginationMaterial: {
            totalCount: listData.totalCount,
            currentPage: 1,
        },
        siteData: {
            title: config.siteTitle,
            description: config.siteDescription,
            ogpType: "website" as const,
            ogpUrl: config.siteURL,
        },

    }
    return c.html(<HomeContent {...props} />)
})

/**
 * 記事詳細ページ
 */
app.get('/post/:slug', async (c) => {
    const slug = c.req.param('slug')
    const client = createClient({
        serviceDomain: c.env.SERVICE_DOMAIN,
        apiKey: c.env.API_KEY,
    })
    const listDetail = await client.getListDetail<Post>({ endpoint: 'post', contentId: slug })
    const props = {
        post: listDetail,
        siteData: {
            title: listDetail.title,
            description: listDetail.description,
            ogpType: "article" as const,
            ogpImage: listDetail.thumbnail?.url,
            ogpUrl: config.siteURL + `/post/${slug}`,
        },
    }
    return c.html(<DetailContent {...props} />)
})


/**
 * 下書き中の記事詳細ページ
 */
app.get('/post/:slug/draft', async (c) => {
    const slug = c.req.param('slug')
    const draftKey = c.req.query('draftKey')
    const client = createClient({
        serviceDomain: c.env.SERVICE_DOMAIN,
        apiKey: c.env.API_KEY,
    })
    const listDetail = await client.getListDetail<Post>({ endpoint: 'post', contentId: slug, queries: { draftKey: draftKey } })
    listDetail.title = listDetail.title + "（下書き）"
    const props = {
        post: listDetail,
        siteData: {
            title: listDetail.title,
            description: listDetail.description,
            ogpType: "article" as const,
            ogpImage: listDetail.thumbnail?.url,
            ogpUrl: config.siteURL + `/post/${slug}`,
        },
    }
    return c.html(<DetailContent {...props} />)
})

/**
 * ページ番号でアクセス
 */
app.get('/page/:pageId', async (c) => {
    const pageId = c.req.param('pageId')
    const client = createClient({
        serviceDomain: c.env.SERVICE_DOMAIN,
        apiKey: c.env.API_KEY,
    })
    const queries: MicroCMSQueries = {
        offset: (Number(pageId) - 1) * limit,
        limit: limit
    }
    const listData = await client.getList<Post>({ endpoint: 'post', queries: queries })
    const posts = listData.contents
    const props = {
        posts: posts,
        paginationMaterial: {
            totalCount: listData.totalCount,
            currentPage: Number(pageId),
        },
        siteData: {
            title: config.siteTitle,
            description: config.siteDescription,
            ogpType: "website" as const,
            ogpUrl: config.siteURL,
        },
    }
    return c.html(<HomeContent {...props} />)
})


/**
 * カテゴリー指定でアクセス
 */
app.get('/:categoryId/page/:pageId', async (c) => {
    const categoryId = c.req.param('categoryId')
    const pageId = c.req.param('pageId')
    const client = createClient({
        serviceDomain: c.env.SERVICE_DOMAIN,
        apiKey: c.env.API_KEY,
    })
    const queries: MicroCMSQueries = {
        filters: `category[equals]${categoryId}`,
        offset: (Number(pageId) - 1) * limit,
        limit: limit
    }
    const listData = await client.getList<Post>({ endpoint: 'post', queries: queries })
    const posts = listData.contents

    const categoryDetail = await client.getListDetail<Category>({
        endpoint: "category",
        contentId: categoryId,
    });

    const props = {
        posts: posts,
        paginationMaterial: {
            totalCount: listData.totalCount,
            currentPage: Number(pageId),
            categoryId: categoryId,
        },
        category: categoryDetail,
        siteData: {
            title: config.siteTitle,
            description: config.siteDescription,
            ogpType: "website" as const,
            ogpUrl: config.siteURL,
        },
    }
    return c.html(<HomeContent {...props} />)
})

/**
 * タグ指定でアクセス
 */
app.get('/tags/:tagId/page/:pageId', async (c) => {
    const tagId = c.req.param('tagId')
    const pageId = c.req.param('pageId')
    const client = createClient({
        serviceDomain: c.env.SERVICE_DOMAIN,
        apiKey: c.env.API_KEY,
    })
    const queries: MicroCMSQueries = {
        filters: `tag[contains]${tagId}`,
        offset: (Number(pageId) - 1) * limit,
        limit: limit
    }
    const listData = await client.getList<Post>({ endpoint: 'post', queries: queries })
    const posts = listData.contents

    const tagDetail = await client.getListDetail<Tag>({
        endpoint: "tag",
        contentId: tagId,
    });

    const props = {
        posts: posts,
        tag: tagDetail,
        paginationMaterial: {
            totalCount: listData.totalCount,
            currentPage: Number(pageId),
            tagId: tagId,
        },
        siteData: {
            title: config.siteTitle,
            description: config.siteDescription,
            ogpType: "website" as const,
            ogpUrl: config.siteURL,
        },
    }
    return c.html(<HomeContent {...props} />)
})

export default app