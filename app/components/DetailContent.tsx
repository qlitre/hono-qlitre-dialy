import { ArticleDetail } from "./ArticleDetail";
import type { Post } from "../types/blog";

export const DetailContent = (props: { post: Post }) => (
  <div class="container">
    <ArticleDetail post={props.post}></ArticleDetail>
  </div>
);
