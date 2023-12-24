import { html } from 'hono/html'
import { config } from './settings/siteSettings'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Post, Category, Tag } from './types/blog'
import { ArticleList } from './components/ArticleList'
import { Breadcrumbs } from './components/Breadcrumbs'
import { ArticleDetail } from './components/ArticleDetail'
import { Pagination } from './components/Paginations';

type SiteData = {
  title: string
  description: string
  children?: any
  ogpType: 'website' | 'article'
  ogpImage?: string
  ogpUrl?: string
}

type PaginationMaterial = {
  totalCount: number;
  currentPage: number;
  categoryId?: string
  tagId?: string;
}

export const Layout = (props: SiteData) => html`<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8" />
  <title>${props.title}</title>
  <link rel="stylesheet" href="/static/css/style.css" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="${props.description}" />
  <meta name="author" content="${config.author}" />
  <!-- OGP -->
  <meta property="og:title" content="${props.title}">
  <meta property="og:description" content="${props.description}">
  <meta property="og:url" content="${props.ogpUrl}">
  <meta property="og:site_name" content="${config.siteTitle}">
  <meta property="og:image" content="${props.ogpImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:type" content="${props.ogpType}">
  <meta property="article:author" content="${config.twitterURL}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:creator" content="@${config.twitterID}">
  </head>
  <body>
    ${<Header></Header>}
    ${props.children}
    ${<Footer></Footer>}    
  </body>
</html>`

export const HomeContent = (props: {
  siteData: SiteData,
  posts: Post[],
  paginationMaterial: PaginationMaterial,
  category?: Category,
  tag?: Tag
}) => (
  <Layout {...props.siteData}>
    <div class="container">
      <Breadcrumbs category={props.category} tag={props.tag}></Breadcrumbs>
      <ArticleList posts={props.posts}></ArticleList>
      <Pagination totalCount={props.paginationMaterial.totalCount}
        currentPage={props.paginationMaterial.currentPage}
        categoryId={props.paginationMaterial.categoryId}
        tagId={props.paginationMaterial.tagId}>
      </Pagination>
    </div>
  </Layout>
)

export const DetailContent = (props: { siteData: SiteData, post: Post }) => (
  <Layout {...props.siteData}>
    <div class="container">
      <ArticleDetail post={props.post}></ArticleDetail>
    </div>
  </Layout>
)
