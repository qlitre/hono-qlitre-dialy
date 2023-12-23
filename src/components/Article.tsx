import type { Post } from '../types/blog';
import { TagInline } from './TagInline';
import { jstDatetime } from '../utils/jstDatetime';

type Props = {
    post: Post
}

export const Article = ({ post }: Props) => {
    return (
        <div>
            <a class="Article__titleLink" href={`/post/${post.id}`}>
                <h1 class="Article__title">{post.title}</h1>
            </a>
            <p class="Article__publishedAt">{jstDatetime(post.publishedAt, "YYYY年MM月DD日")}</p>
            <p class="Article__description">{post.description}</p>
            <TagInline category={post.category} tags={post.tag} />
            <a href={`/post/${post.id}`} class="Article__linkButton">続きを読む</a>
        </div>
    );
};