import { css } from "hono/css";
import type { RelatedPosts as RelatedPostsType } from "../types/blog";
import { LineDevider } from "./LineDivider";
import { jstDatetime } from "../utils/jstDatetime";

type Props = {
  relatedPosts: RelatedPostsType;
};

export const RelatedPosts = ({ relatedPosts }: Props) => {
  const containerClass = css`
    margin-top: var(--spacing-8);
  `;

  const titleClass = css`
    font-family: var(--font-family-heading);
    font-weight: bold;
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-4);
    color: var(--c-gray-900);
  `;

  const listClass = css`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  `;

  const itemClass = css`
    padding-bottom: var(--spacing-2);    
    &:last-child {
      padding-bottom: 0;
    }
  `;

  const postTitleClass = css`
    line-height: 1.6;
    font-family: var(--font-family-heading);
    font-weight: bold;
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-2);
    color: var(--c-gray-900);
  `;

  const titleLinkClass = css`
    color: inherit;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  `;

  const publishedAtClass = css`
    margin-bottom: var(--spacing-2);
    color: var(--c-gray-700);
    font-size: var(--font-size-sm);
  `;

  const descriptionClass = css`
    line-height: 1.6;
    color: var(--c-gray-700);
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-4);
  `;

  return (
    <div class={containerClass}>
      <LineDevider />
      <h3 class={titleClass}>関連記事</h3>
      <ul class={listClass}>
        {relatedPosts.map((post) => (
          <li key={post.id} class={itemClass}>
            <a class={titleLinkClass} href={`/post/${post.id}`}>
              <h4 class={postTitleClass}>{post.title}</h4>
            </a>
            <p class={publishedAtClass}>
              {jstDatetime(post.publishedAt, "YYYY年MM月DD日")}
            </p>
            <p class={descriptionClass}>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};