import { Post, Category, Tag } from "../types/blog";
import { Pagination } from "./Pagination";
import { Breadcrumbs } from "./Breadcrumbs";
import { CategoryNavigation } from "./CategoryNavigation";
import { ArticleList } from "./ArticleList";

type PaginationMaterial = {
  totalCount: number;
  currentPage: number;
  categoryId?: string;
  tagId?: string;
};

export const HomeContent = (props: {
  posts: Post[];
  categories: Category[];
  paginationMaterial: PaginationMaterial;
  category?: Category;
  tag?: Tag;
}) => (
  <div class="container">
    <Breadcrumbs category={props.category} tag={props.tag}></Breadcrumbs>
    <CategoryNavigation
      categories={props.categories}
      activeCategoryId={props.category?.id}
    ></CategoryNavigation>
    <ArticleList posts={props.posts}></ArticleList>
    <Pagination
      totalCount={props.paginationMaterial.totalCount}
      currentPage={props.paginationMaterial.currentPage}
      categoryId={props.paginationMaterial.categoryId}
      tagId={props.paginationMaterial.tagId}
    ></Pagination>
  </div>
);
