import { css } from "hono/css";
import { useState } from "hono/jsx";

export const SearchForm = () => {
    const btnClass = css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-2);
        font-size: var(--font-size-sm);
        color: black;
        background-color: white;
        border: none;
        cursor:pointer;
        padding-left: var(--spacing-4);
        padding-right: var(--spacing-4);
        height: var(--size-10);
        transition: background-color 0.3s;
        &:hover {
            background-color: var(--c-gray-200);
        }
  `;

    const imgClass = css`
        width: 20px;
        height: 20px;
  `;

    const backdropClass = css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
  `;

    const modalClass = css`
        background: white;
        padding: 16px;
        border-radius: 8px;
        width: 300px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  `;

    const closeButtonClass = css`
        display: block;
        margin-left: auto;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
  `;

    const searchContainerClass = css`
        display: flex;
        align-items: center;
        background: white;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        padding: 4px;
        transition: border 0.2s ease-in-out;

        &:focus-within {
            border: 2px solid #4f46e5;
            outline: none;
        }
  `;

    const searchInput = css`
        flex: 1;
        border: none;
        padding: 8px 12px;
        font-size: 16px;
        color: #1a1a1a;
        outline: none;
  `;

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim() !== "") {
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div>
            {/* 検索ボタン */}
            <button class={btnClass} onClick={() => setIsOpen(true)}>
                <img class={imgClass} src="/static/images/icon_search.svg" alt="Search Icon" />
            </button>

            {/* モーダル (検索ボックス) */}
            {isOpen && (
                <div class={backdropClass} onClick={() => setIsOpen(false)}>
                    <div class={modalClass} onClick={(e) => e.stopPropagation()}>
                        {/* 閉じるボタン */}
                        <button class={closeButtonClass} onClick={() => setIsOpen(false)}>
                            ✕
                        </button>

                        {/* 検索入力 */}
                        <div class={searchContainerClass}>
                            <input
                                id="search"
                                name="search"
                                type="text"
                                class={searchInput}
                                placeholder="Search..."
                                value={query}
                                onInput={(e) => setQuery((e.currentTarget as HTMLInputElement).value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
