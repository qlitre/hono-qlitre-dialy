import type { AmazonAssociateLink } from "../types/blog";

type Props = {
    content: AmazonAssociateLink;
}

export const AmazonLink = ({ content }: Props) => {
    return (
        <div class="AmazonLink__linkCard">
            <div class="AmazonLink__left">
                <a class="AmazonLink__title" href={content.productLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    {content.productName}
                </a>
                <a class="AmazonLink__link" href={content.productLink}
                    target="_blank"
                    rel="noreferrer">
                    Amazonで購入する
                </a>
            </div>
            <div class="AmazonLink__right">
                <img class="AmazonLink__img" src={content.productImage.url} alt={content.productName} />
            </div>
        </div>
    )
};