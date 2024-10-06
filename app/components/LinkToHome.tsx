import { css } from "hono/css"


export const LinkToHome = () => {

    const linkToHomeBlockClass = css` 
        display: flex;
        justify-content: center;
        margin-top: var(--spacing-16);
    `

    const linkToHomeClass = css`
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        transition: color 0.2s, box-shadow 0.2s;
        margin: 0 auto;
    
        &:hover {
            color: var(--c-teal-400);
        }
    `
    return (
        <div class={linkToHomeBlockClass}>
            <a class={linkToHomeClass} href="/">
                <span>記事一覧へ</span>
            </a>
        </div>
    )
}