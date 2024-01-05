import { css } from "hono/css";
import type { Category } from "../types/blog";

type Props = {
    category: Category
}

export const CategoryLabel = ({ category }: Props) => {
    const categoryLabeLClass = css`
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
        background: var(--c-teal-100);
        color: var(--c-teal-800);
    `
    return (
        <a href={`/${category.id}/page/1`}>
            <span class={categoryLabeLClass}>{category.name}</span>
        </a>)
};