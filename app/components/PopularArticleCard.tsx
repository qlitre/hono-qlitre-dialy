import { css } from "hono/css";
import type { PopularPage } from "../types/blog";

type Props = {
  post: PopularPage;
  rank: number;
};

export const PopularArticleCard = ({ post, rank }: Props) => {
  const cardLinkClass = css`
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    padding: var(--spacing-3) var(--spacing-4);
    border-bottom: 1px solid var(--c-gray-100);
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--c-gray-50);
    }
  `;

  const rankClass = css`
    flex-shrink: 0;
    width: 2rem;
    text-align: center;
    font-size: var(--font-size-lg);
    font-weight: bold;
    color: var(--c-gray-400);
  `;

  const contentClass = css`
    flex: 1;
    min-width: 0;
  `;

  const titleClass = css`
    font-size: var(--font-size-md);
    font-weight: 600;
    color: var(--c-gray-800);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;

  const subtitleClass = css`
    color: var(--c-gray-500);
    font-weight: normal;
  `;

  const viewCountClass = css`
    flex-shrink: 0;
    font-size: var(--font-size-sm);
    color: var(--c-gray-400);
  `;

  return (
    <a href={`/post/${post.page_id}`} class={cardLinkClass}>
      <span class={rankClass}>{rank}</span>
      <div class={contentClass}>
        <h2 class={titleClass}>{post.title}</h2>
      </div>
      <span class={viewCountClass}>{post.views} views</span>
    </a>
  );
};
