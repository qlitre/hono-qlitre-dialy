import { css } from "hono/css";
import { BLOG_PER_PAGE } from "../settings/siteSettings";

type Props = {
    totalCount: number;
    currentPage: number;
    categoryId?: string;
    tagId?: string;
    children?: any
};

export const Pagination = ({ totalCount, categoryId, tagId, currentPage = 1 }: Props) => {

    const wrapperClass = css`
        padding: var(--spacing-4) 0;
    `

    const pagerClass = css` 
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-10) 0;
        font-size: var(--font-size-xl);
        font-weight: 500;
    `

    const omissionClass = css`
        color: var(--c-gray-400);
        margin: var(--spacing-1) var(--spacing-3);
    `

    const pageClass = css`
        list-style: none;
        width: var(--size-10);
        height: var(--size-10);
        margin: var(--spacing-1);
    `
    const activeClass = css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: var(--c-gray-600);
        border: 1px solid var(--c-teal-400);
        color: var(--c-teal-400);
    `
    const linkClass = css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        color: var(--c-gray-600);

        &:hover {
            color: var(--c-gray-400);
        }
    `

    const getPath = (p: number) => {
        if (categoryId) return `/${categoryId}/page/${p}`
        if (tagId) return `/tags/${tagId}/page/${p}`;
        return `/page/${p}`;
    }

    const getPaginationItem = (p: number) => {
        if (p === currentPage) {
            return (
                <span class={activeClass}>{p}</span>
            )
        }
        return (
            <a class={linkClass} href={getPath(p)}>{p}</a>
        )
    }
    const pager: number[] = []
    const numPages = Math.ceil(totalCount / BLOG_PER_PAGE)
    for (let i = 1; i < numPages + 1; i++) {
        if (i < currentPage - 2) continue
        if (i > currentPage + 2) continue
        pager.push(i)
    }
    return (
        <div class={wrapperClass}>
            <ul class={pagerClass}>
                {currentPage >= 2 && (
                    <li class={pageClass}>
                        <a class={linkClass} href={getPath(currentPage - 1)}>
                            prev
                        </a>
                    </li>
                )}
                {currentPage >= 4 && (
                    <li class={pageClass}>
                        {getPaginationItem(1)}
                    </li>
                )}
                {currentPage >= 5 && <span class={omissionClass}>...</span>}

                {pager.map((number) => (
                    <li class={pageClass} key={number}>
                        {getPaginationItem(number)}
                    </li>
                ))}
                {currentPage <= numPages - 4 && <span class="Pagination__omission">...</span>}
                {currentPage <= numPages - 3 && (
                    <li class={pageClass}>
                        {getPaginationItem(numPages)}
                    </li>
                )}
                {currentPage < numPages && (
                    <li class={pageClass}>
                        <a class={linkClass} href={getPath(currentPage + 1)}>
                            next
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
};