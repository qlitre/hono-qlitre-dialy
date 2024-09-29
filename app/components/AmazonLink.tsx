import { css } from "hono/css"
import type { AmazonAssociateLink } from "../types/blog";

type Props = {
    content: AmazonAssociateLink;
}

export const AmazonLink = ({ content }: Props) => {

    const linkCardClass = css`
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-4);
        border: 1px solid;
        border-color: var(--c-teal-400);
        border-radius: var(--border-radius-4);
        margin: var(--spacing-4) 0;
    `
    const leftClass = css`
        padding-right: var(--spacing-4);
    `

    const titleClass = css`
        font-size: var(--font-size-sm);
        line-height: 1.8;
        font-weight: bold;
        margin-bottom: var(--spacing-4);
        color: var(--c-gray-500);
        display: block;

        &:hover {
            opacity: .5;
        }
    `

    const linkClass = css`
        color: var(--c-teal-400);
        font-size: var(--font-size-sm);
        font-weight: 500;

        &:hover {
            opacity: .5;
        }
    `

    const imgClass = css`
        max-height: 150px;
        width: auto;
    `

    return (
        <div class={linkCardClass}>
            <div class={leftClass}>
                <a class={titleClass} href={content.productLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    {content.productName}
                </a>
                <a class={linkClass} href={content.productLink}
                    target="_blank"
                    rel="noreferrer">
                    Amazonで購入する
                </a>
            </div>
            <div>
                <img class={imgClass} src={content.productImage.url} alt={content.productName} />
            </div>
        </div>
    )
};