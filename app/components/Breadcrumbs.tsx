import { css } from "hono/css";
import type { Category, Tag } from "../types/blog";
import { CategoryLabel } from "../components/CategoryLabel";
import { TagLabel } from "../components/TagLabel";

type Props = {
  category?: Category;
  tag?: Tag;
  keyword?: string;
};

export const Breadcrumbs = ({ category, tag, keyword }: Props) => {
  const containerClass = css`
    margin-bottom: var(--spacing-8);
  `;

  const homeClass = css`
    font-size: var(--font-size-lg);
    font-weight: bold;
  `;

  const separatorClass = css`
    font-size: var(--font-size-lg);
    margin: 0 var(--spacing-4);
  `;

  const keywordClass = css`
    font-size: var(--font-size-sm);
    color: var(--c-gray-500);
  `;

  return (
    <div class={containerClass}>
      <a class={homeClass} href="/">
        Home
      </a>
      {category && (
        <>
          <span class={separatorClass}>/</span>
          <CategoryLabel category={category} />
        </>
      )}
      {tag && (
        <>
          <span class={separatorClass}>/</span>
          <TagLabel tag={tag} />
        </>
      )}
      {keyword && (
        <>
          <span class={separatorClass}>/</span>
          <span class={keywordClass}>キーワード：{keyword}</span>
        </>
      )}
    </div>
  );
};
