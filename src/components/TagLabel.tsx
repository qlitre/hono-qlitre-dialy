import type { Tag } from "../types/blog";

type Props = {
    tag: Tag
}

export const TagLabel = ({ tag }: Props) => {
    return (
        <a href={`/tags/${tag.id}/page/1`}>
            <span class="TagLabel__tagLabel">
                {tag.name}
            </span>
        </a>)
};