import type { Category } from "../types/blog";

type Props = {
    category: Category
}

export const CategoryLabel = ({ category }: Props) => {
    return (
        <a href={`/${category.id}/page/1`}>
            <span class="CategoryLabel__categoryLabeL">{category.name}</span>
        </a>)
};