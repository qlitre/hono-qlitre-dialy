import type { Category, Tag } from "../types/blog";
import { CategoryLabel } from "./CategoryLabel";
import { TagLabel } from "./TagLabel";


type Props = {
    category: Category;
    tags: Tag[]
}

export const TagInline = ({ category, tags }: Props) => {
    return (
        <div class="TagInline__tags">
            <CategoryLabel category={category} />
            {tags.map((tag) => (
                <TagLabel tag={tag} />
            ))}
        </div>
    );
}
