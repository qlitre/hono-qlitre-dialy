import { css } from "hono/css";

type Props = {
  initialQuery?: string;
  placeholder?: string;
};

export const SearchForm = ({
  initialQuery = "",
  placeholder = "検索...",
}: Props) => {
  const formClass = css`
    margin-bottom: var(--spacing-6);
  `;

  const containerClass = css`
    display: flex;
    gap: var(--spacing-2);
  `;

  const inputClass = css`
    flex: 1;
    min-width: 0;
    padding: var(--spacing-3);
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 16px;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #3b82f6;
    }
  `;

  const submitButtonClass = css`
    padding: var(--spacing-2) var(--spacing-6);
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s;

    &:hover {
      background-color: #1d4ed8;
    }

    @media (max-width: 640px) {
      padding: var(--spacing-2) var(--spacing-4);
    }
  `;

  return (
    <form method="get" action="/search" class={formClass}>
      <div class={containerClass}>
        <input
          type="text"
          name="q"
          defaultValue={initialQuery}
          placeholder={placeholder}
          class={inputClass}
        />
        <button type="submit" class={submitButtonClass}>
          検索
        </button>
      </div>
    </form>
  );
};
