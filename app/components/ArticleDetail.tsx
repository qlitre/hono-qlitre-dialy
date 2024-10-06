import { css } from "hono/css";
import type { Post } from '../types/blog';
import { LineDevider } from './LineDivider';
import { TagInline } from './TagInline';
import { LinkToHome } from "./LinkToHome";
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
            <LinkToHome />
        </div>
    );
};