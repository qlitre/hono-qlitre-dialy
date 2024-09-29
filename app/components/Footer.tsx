import { css } from "hono/css";
import { config } from '../settings/siteSettings';

export const Footer = () => {
    const footerClass = css`
        text-align: center;
        padding: 2rem 0;
    `
    const wrapperClass = css`
        max-width: 1100px;
        margin: 0 auto;
    `
    const textClass = css`
        color: var(--c-gray-500);
        font-size: var(--font-size-sm);
    `
    return (
        <footer class={footerClass}>
            <div class={wrapperClass}>
                <p class={textClass}><small>© {config.author}</small></p>
            </div>
        </footer>
    );
};