import { css } from "hono/css"
import type { Post } from '../types/blog';
import { TagInline } from './TagInline';
import { jstDatetime } from '../utils/jstDatetime';

type Props = {
    post: Post
}

export const Article = ({ post }: Props) => {
    const publishedAtClass = css`
        margin-top: var(--spacing-2);
        color: var(--c-gray-700);
        font-size: var(--font-size-sm);
    `

    const descriptionClass = css`
        line-height: 1.6;
        margin-top: var(--spacing-2);
        color: var(--c-gray-700);
        font-size: var(--font-size-md);
    `

    const titleLinkClass = css`
        &:hover {
            text-decoration: underline;
        }
    `
    const titleClass = css`
        line-height: 1.6;
        font-family: var(--font-family-heading);
        font-weight: bold;
        font-size: var(--font-size-xl);
    `
    const linkButtonClass = css`
        margin-top: var(--spacing-8);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-sm);
        padding: var(--spacing-1) var(--spacing-2);
        transition: background-color 0.2s;
        color: var(--c-teal-500);
        background-color: var(--c-white);
        border: var(--border-1);
        border-radius: var(--radius-sm);

        &:hover {
            background-color: var(--c-teal-100);
        }
    `

    return (
        <div>
            <a class={titleLinkClass} href={`/post/${post.id}`}>
                <h1 class={titleClass}>{post.title}</h1>
            </a>
            <p class={publishedAtClass}>{jstDatetime(post.publishedAt, "YYYY年MM月DD日")}</p>
            <p class={descriptionClass}>{post.description}</p>
            <TagInline category={post.category} tags={post.tag} />
            <a href={`/post/${post.id}`} class={linkButtonClass}>続きを読む</a>
        </div>
    );
};