import type { Category, Tag } from '../types/blog';
import { CategoryLabel } from '../components/CategoryLabel';
import { TagLabel } from '../components/TagLabel';


type Props = {
    category?: Category;
    tag?: Tag;
};

export const Breadcrumbs = ({ category, tag }: Props) => {
    return (
        <div class="Breadcrumbs__container">
            <a class="Breadcrumbs__home" href='/'>Home</a>
            {category && (
                <>
                    <span class="Breadcrumbs__separator">/</span>
                    <CategoryLabel category={category} />
                </>
            )}
            {tag && (
                <>
                    <span class="Breadcrumbs__separator">/</span>
                    <TagLabel tag={tag} />
                </>
            )}
        </div>
    );
};