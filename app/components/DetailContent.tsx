import { ArticleDetail } from "./ArticleDetail";
import type { Post,RelatedPosts } from "../types/blog";

export const DetailContent = (props: { post: Post,relatedPosts?:RelatedPosts }) => (
  <div class="container">
    <ArticleDetail post={props.post} relatedPosts={props.relatedPosts}></ArticleDetail>
  </div>
);
