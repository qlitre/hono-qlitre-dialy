// 1ページあたりの記事数
export const BLOG_PER_PAGE = 10;

export const config = {
  // Headerなどに表示
  siteTitle: "QLITRE DIALY",
  // スラッシュは最後にいれない
  siteURL: "https://qlitre-dialy.ink",
  // footer、meta descriptionに表示
  author: "qlitre",
  // meta descriptionに表示
  siteDescription: "QLITREの日記サイト。",
  // HeaderのGitHUBリンク
  repos: "https://github.com/qlitre/hono-qlitre-dialy",
  // Aboutページのリンク
  about: "https://qlitre.me",
  twitterURL: "https://twitter.com/kuri_tter",
  // @はいれない
  twitterID: "kuri_tter",
  // 記事一覧取得用のフィールド
  postListFields: "id,title,publishedAt,description,tag,category",
};
