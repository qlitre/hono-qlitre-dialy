import { BLOG_PER_PAGE } from "../settings/siteSettings";

type Props = {
    totalCount: number;
    currentPage: number;
    categoryId?: string;
    tagId?: string;
    children?: any
};

export const Pagination = ({ totalCount, categoryId, tagId, currentPage = 1 }: Props) => {

    const getPath = (p: number) => {
        if (categoryId) return `/${categoryId}/page/${p}`
        if (tagId) return `/tags/${tagId}/page/${p}`;
        return `/page/${p}`;
    }
    const getPaginationItem = (p: number) => {
        if (p === currentPage) {
            return (
                <span class="Pagination__active">{p}</span>
            )
        }
        return (
            <a class="Pagination__link" href={getPath(p)}>{p}</a>
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
        <div class="Pagination__wrapper">
            <ul class="Pagination__pager">
                {currentPage >= 2 && (
                    <li class="Pagination__page">
                        <a class="Pagination__link" href={getPath(currentPage - 1)}>
                            prev
                        </a>
                    </li>
                )}
                {currentPage >= 4 && (
                    <li class="Pagination__page">
                        {getPaginationItem(1)}
                    </li>
                )}
                {currentPage >= 5 && <span class="Pagination__omission">...</span>}

                {pager.map((number) => (
                    <li class="Pagination__page" key={number}>
                        {getPaginationItem(number)}
                    </li>
                ))}
                {currentPage <= numPages - 4 && <span class="Pagination__omission">...</span>}
                {currentPage <= numPages - 3 && (
                    <li class="Pagination__page">
                        {getPaginationItem(numPages)}
                    </li>
                )}
                {currentPage < numPages && (
                    <li class="Pagination__page">
                        <a class="Pagination__link" href={getPath(currentPage + 1)}>
                            next
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
};