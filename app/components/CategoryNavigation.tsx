import { css } from "hono/css";
import type { Category } from "../types/blog";

type Props = {
    categories: Category[];
    activeCategoryId?: string
}

export const CategoryNavigation = ({ categories, activeCategoryId }: Props) => {
    const categoryNavigationClass = css`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        border-bottom: var(--border-2);
        border-color: var(--c-gray-300);
        gap: var(--spacing-4);
        margin-bottom: var(--spacing-8);
    `

    return (
        <nav class={categoryNavigationClass}>
            {categories.map(category => (
                <NavigationLink
                    href={`/category/${category.id}/page/1`}
                    categoryId={category.id}
                    activeCategoryId={activeCategoryId}
                >
                    {category.name}
                </NavigationLink>
            ))}
        </nav>
    );
};

type ChildProps = {
    href: string;
    children: string;
    categoryId: string;
    activeCategoryId?: string;
}

const NavigationLink = ({ href, children, categoryId, activeCategoryId }: ChildProps) => {
    const isActive = categoryId === activeCategoryId;

    const categoryLinkActiveClass = css`
        font-weight: bold;
        font-size: var(--font-size-md);
        padding: var(--spacing-2) var(--spacing-4);
        margin-bottom: -2px;
        color: var(--c-teal-400);
        border-bottom: var(--border-2);
        border-color: var(--c-teal-400);
    
        &:hover {
            background-color: var(--c-black-alpha-100);
        }
    `


    const categoryLinkClass = css` 
        font-weight: bold;
        font-size: var(--font-size-md);
        padding: var(--spacing-2) var(--spacing-4);
        color: var(--c-black-alpha-500);
        &:hover {
            background-color: var(--c-black-alpha-100);
        }
    `

    if (isActive) {
        return (
            <a class={categoryLinkActiveClass} href={href} passHref>
                {children}
            </a>
        );
    }
    return (
        <a class={categoryLinkClass} href={href} passHref>
            {children}
        </a>
    );
};