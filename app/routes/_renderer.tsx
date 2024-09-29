import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script, Link } from 'honox/server'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { config } from '../settings/siteSettings'

export default jsxRenderer(({ children, meta }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{meta?.title}</title>
        <link rel="canonical" href={meta?.canonicalUrl} />
        <meta name="description" content={meta?.description} />
        <meta name="author" content={config.author} />
        {/*<!-- OGP -->*/}
        <meta property="og:title" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:url" content={meta?.ogpUrl} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={meta?.ogpImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content={meta?.ogpType} />
        <meta property="article:author" content={config.twitterURL} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={'@' + config.twitterID} />
        <link rel="icon" href="/favicon.ico" />
        <Script src="/app/client.ts" async />
        <Link href="/static/css/root.css" rel="stylesheet" />
        <Link href="/static/css/style.css" rel="stylesheet" />
        <Style />
        {/*<!-- Google Ad -->*/}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7543031846020039"
          crossorigin="anonymous"></script>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/dracula.min.css" />
        <script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/highlight.min.js"></script>
        <script>hljs.initHighlightingOnLoad();</script>
      </head>
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
})
