import { css } from "hono/css";
import type { Category, Tag } from "../types/blog";
import { CategoryLabel } from "./CategoryLabel";
import { TagLabel } from "./TagLabel";

type Props = {
  category: Category;
  tags: Tag[];
};

export const TagInline = ({ category, tags }: Props) => {
  const tagsClass = css`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    gap: var(--spacing-2);
    margin-top: var(--spacing-8);
  `;
  return (
    <div class={tagsClass}>
      <CategoryLabel category={category} />
      {tags.map((tag) => (
        <TagLabel tag={tag} />
      ))}
    </div>
  );
};
