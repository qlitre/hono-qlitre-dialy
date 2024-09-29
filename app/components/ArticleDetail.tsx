import { css } from "hono/css";
import type { Post } from '../types/blog';
import { LineDevider } from './LineDivider';
import { TagInline } from './TagInline';
import { ShareX } from './ShareX';
import { MarkdownTemplate } from './MarkdownTemplate';
import { RepeatedBody } from './RepeatedBody';
import { jstDatetime } from '../utils/jstDatetime';

type Props = {
    post: Post
}

export const ArticleDetail = ({ post }: Props) => {

    const containerClass = css` 
        margin-top: var(--spacing-8);
        margin-bottom: var(--spacing-16);
        max-width: 720px;
    `


    const titleClass = css` 
        line-height: 1.6;
        font-family: var(--font-family-heading);
        font-weight: bold;
        font-size: var(--font-size-xl);
    `

    const publishedAtClass = css` 
        margin-top: var(--spacing-4);
        color: var(--c-gray-700);
        font-size: var(--font-size-sm);
    `

    const linkToHomeBlockClass = css` 
        display: flex;
        justify-content: center;
        margin-top: var(--spacing-16);
    `

    const linkToHomeClass = css`
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        transition: color 0.2s, box-shadow 0.2s;
        margin: 0 auto;
    
        &:hover {
            color: var(--c-teal-400);
        }
    `

    const shareClass = css` 
        margin-top: var(--spacing-8);
        margin-bottom: var(--spacing-8);
    `

    return (
        <div class={containerClass}>
            <h1 class={titleClass}>{post.title}</h1>
            <p class={publishedAtClass}>{jstDatetime(post.publishedAt, "YYYY年MM月DD日")}</p>
            <TagInline category={post.category} tags={post.tag}></TagInline>
            <LineDevider />
            {post.useRepeatedBody ? <RepeatedBody repeatedBody={post.repeatedBody} /> : <MarkdownTemplate body={post.text} />}
            <LineDevider />
            <div class={shareClass}>
                <ShareX slug={post.id} title={post.title} />
            </div>
            <div class={linkToHomeBlockClass}>
                <a class={linkToHomeClass} href="/">
                    <span>記事一覧へ</span>
                </a>
            </div>
        </div>
    );
};