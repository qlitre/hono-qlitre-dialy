import type {
  MicroCMSDate,
  MicroCMSListContent,
  MicroCMSListResponse,
} from "microcms-js-sdk";
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
export type PostListResponse = MicroCMSListResponse<Post>;
