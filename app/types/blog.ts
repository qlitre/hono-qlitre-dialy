import type { MicroCMSListContent } from "microcms-js-sdk";
import type { MicroCMSImage } from "microcms-js-sdk";

export type Tag = {
  name: string;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type RichEditor = {
  richText: string;
};

export type AmazonAssociateLink = {
  productName: string;
  productImage: MicroCMSImage;
  productLink: string;
};

export type Body = {
  fieldId: "richEditor" | "amazonLink";
} & RichEditor &
  AmazonAssociateLink;

export type Post = {
  title: string;
  thumbnail: MicroCMSImage;
  description: string;
  category: Category;
  tag: Tag[];
  keywords: string;
  text: string;
  useRepeatedBody: boolean;
  repeatedBody: Body[];
  relatedPosts: RelatedPost[];
} & MicroCMSListContent;

export type RelatedPost = Pick<
  Post,
  "id" | "title" | "description" | "publishedAt"
>;
export type RelatedPosts = RelatedPost[];

// popular_page テーブルの型定義
export interface PopularPage {
  page_id: string;
  views: number;
  title: string;
  description?: string;
  thumbnail_url?: string;
  category_id?: string;
  category_name?: string;
  tags?: string;
  published_at?: string;
  updated_at?: string;
  is_active: boolean;
}

export interface PopularArticleResponse {
  id: string;
  title: string;
  url: string;
  views: number;
  description?: string;
  thumbnail_url?: string;
  category_name?: string;
  published_at?: string;
}

// D1Result型を拡張してPopularPageを指定
export interface D1ResultWithPopularPage {
  results: PopularPage[];
  success: boolean;
  meta: {
    served_by: string;
    duration: number;
    changes: number;
    last_row_id: number;
    changed_db: boolean;
    size_after: number;
    rows_read: number;
    rows_written: number;
  };
}
