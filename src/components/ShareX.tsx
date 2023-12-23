import { config } from '../settings/siteSettings'


type Props = {
    slug: string;
    title: string;
}

export const ShareX = ({ slug, title }: Props) => {
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${config.siteURL}/post/${slug}&via=${config.twitterID}`;
    return (
        <>
            <a class="ShareX__btn" href={twitterLink} target="_blank" rel="noopener noreferrer">
                <img class="ShareX__img" src="/static/images/xlogo.svg" alt="Twitter" />
                Share
            </a>
        </>
    );
}