import { css } from "hono/css"


export const LineDevider = () => {
    const dividerClass = css`
        border-top: 1px dotted var(--c-gray-500);
        margin: var(--spacing-8) 0;
    `
    return <div class={dividerClass} />
}