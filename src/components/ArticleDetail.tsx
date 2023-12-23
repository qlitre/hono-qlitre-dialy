import type { Post } from '../types/blog';
import { LineDevider } from './LineDivider';
import { TagInline } from './TagInline';
import { ShareX } from './ShareX';
import { MarkdownTemplate } from './MarkdownTemplate';
import { RepeatedBody } from './RepeatedBody';
import { jstDatetime } from '../utils/jstDatetime';

type Props = {
    post: Post
}

export const ArticleDetail = ({ post }: Props) => {
    return (
        <div class="ArticleDetail__container">
            <h1 class="ArticleDetail__title">{post.title}</h1>
            <p class="ArticleDetail__publishedAt">{jstDatetime(post.publishedAt, "YYYY年MM月DD日")}</p>
            <TagInline category={post.category} tags={post.tag}></TagInline>
            <LineDevider />
            {post.useRepeatedBody ? <RepeatedBody repeatedBody={post.repeatedBody} /> : <MarkdownTemplate body={post.text} />}
            <div>
                <ShareX slug={post.id} title={post.title} />
            </div>
            <div class="ArticleDetail__linkToHomeBlock">
                <a class="ArticleDetail__linkToHome" href="/">
                    <span>記事一覧へ</span>
                </a>
            </div>
        </div>
    );
};