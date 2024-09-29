import { css } from "hono/css"
import type { Tag } from "../types/blog";

type Props = {
    tag: Tag
}

export const TagLabel = ({ tag }: Props) => {
    const tagLabelClass = css`
        display: inline-flex;
        vertical-align: top;
        align-items: center;
        font-weight: 500;
        line-height: 1.2;
        border-radius: var(--radius-sm);
        min-height: 1.5rem;
        min-width: 1.5rem;
        font-size: var(--font-size-sm);
        padding: 0 var(--spacing-2);
        background: var(--c-cyan-100);
        color: var(--c-cyan-800);
    `
    return (
        <a href={`/tags/${tag.id}/page/1`}>
            <span class={tagLabelClass}>
                {tag.name}
            </span>
        </a>)
};