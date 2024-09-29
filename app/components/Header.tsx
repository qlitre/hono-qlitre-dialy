import { css } from "hono/css";
import { config } from '../settings/siteSettings';

export const Header = () => {
    const rootClass = css`
        position: sticky;
        top: 0;
        backdrop-filter: blur(8px);
    `

    const containerClass = css`    
        margin-top: var(--spacing-8);
        margin-bottom: var(--spacing-8);
        max-width: 960px;
        margin-left: auto;
        margin-right: auto;
        padding-left: var(--spacing-4);
        padding-right: var(--spacing-4);
    `

    const headerClass = css`
        margin-left: auto;
        margin-right: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: var(--spacing-4);
        padding-bottom: var(--spacing-4);
    `
    const siteTitleClass = css`
        font-size: var(--size-5);
    `
    const navigationClass = css`
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
    `
    const navigationLinkClass = css`
        font-weight: bold;
        text-decoration: none;
    
        &:hover {
            text-decoration: underline;
        }
    `
    return (
        <div class={rootClass}>
            <div class={containerClass}>
                <header class={headerClass}>
                    <h1 class={siteTitleClass}>
                        <a href="/">
                            {config.siteTitle}
                        </a>
                    </h1>
                    <nav class={navigationClass}>
                        <a class={navigationLinkClass} href={config.repos} target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a class={navigationLinkClass} href={config.about} target="_blank" rel="noopener noreferrer">About</a>
                    </nav>
                </header>
            </div>
        </div>
    )
};