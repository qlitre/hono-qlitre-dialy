import { css } from "hono/css";
import { config } from "../settings/siteSettings";

type Props = {
  slug: string;
  title: string;
};

export const ShareX = ({ slug, title }: Props) => {
  const btnClass = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    font-size: var(--font-size-sm);
    border-radius: var(--radius-md);
    color: white;
    background-color: var(--c-black-alpha-900);
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
    height: var(--size-10);
    transition: background-color 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    &:hover {
      background-color: var(--c-black-alpha-700);
    }
  `;
  const imgClass = css`
    width: 20px;
    height: 20px;
  `;
  const text = `${title}\n${config.siteURL}/post/${slug}`
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&via=${config.twitterID}`;
  return (
    <>
      <a
        class={btnClass}
        href={twitterLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img class={imgClass} src="/static/images/xlogo.svg" alt="Twitter" />
        Share
      </a>
    </>
  );
};
