import type { Post } from '../types/blog';
import { Article } from './Article';
import { LineDevider } from './LineDivider';

type Props = {
    posts: Post[]
}

export const ArticleList = ({ posts }: Props) => {
    return (
        <>
            {posts.map(post => (
                <div key={post.id}>
                    <Article post={post} />
                    <LineDevider />
                </div>
            ))}

        </>
    );
}