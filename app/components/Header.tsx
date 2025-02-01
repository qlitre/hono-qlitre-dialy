import { css } from "hono/css";
import { config } from '../settings/siteSettings';
import { SearchForm } from "../islands/SearchForm";

export const Header = () => {
    const rootClass = css`
        position: sticky;
        top: 0;
        backdrop-filter: blur(8px);
        width: 100%;
        background: rgba(255, 255, 255, 0.8);

        @media (max-width: 768px) {
            position: static; /* モバイルでは固定解除 */
            backdrop-filter: none; /* 背景のぼかしも無効化 */
        }
  `;

    const containerClass = css`
        margin-top: var(--spacing-8);
        margin-bottom: var(--spacing-8);
        max-width: 960px;
        margin-left: auto;
        margin-right: auto;
        padding-left: var(--spacing-4);
        padding-right: var(--spacing-4);       
  `;

    // ヘッダーのレイアウト (デスクトップ)
    const headerClass = css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: var(--spacing-4);
        padding-bottom: var(--spacing-4);

        @media (max-width: 768px) {
            flex-direction: column;
            text-align: center;
        }
  `;

    // タイトルのスタイル (中央寄せ)
    const siteTitleClass = css`
        font-size: var(--size-5);

        @media (max-width: 768px) {
            width: 100%;
            text-align: center;
            margin-bottom: var(--spacing-3);
        }
  `;

    // ナビゲーション (PC時は右寄せ、モバイル時は中央)
    const navigationClass = css`
        display: flex;
        align-items: center;
        gap: var(--spacing-3);

        @media (max-width: 768px) {
            justify-content: center;
            width: 100%;
        }
  `;

    const navigationLinkClass = css`
        font-weight: bold;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
  `;

    return (
        <div class={rootClass}>
            <div class={containerClass}>
                <header class={headerClass}>
                    {/* タイトル */}
                    <h1 class={siteTitleClass}>
                        <a href="/">{config.siteTitle}</a>
                    </h1>

                    {/* ナビゲーション (GitHub, About, 検索) */}
                    <nav class={navigationClass}>
                        <a class={navigationLinkClass} href={config.repos} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <a class={navigationLinkClass} href={config.about} target="_blank" rel="noopener noreferrer">
                            About
                        </a>
                        <SearchForm />
                    </nav>
                </header>
            </div>
        </div>
    );
};
