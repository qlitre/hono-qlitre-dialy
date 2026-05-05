import type { Transformer } from "microcms-rich-editor-handler";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const THEME = "github-dark";

const LANG_LOADERS = {
  typescript: () => import("@shikijs/langs/typescript"),
  javascript: () => import("@shikijs/langs/javascript"),
  tsx: () => import("@shikijs/langs/tsx"),
  jsx: () => import("@shikijs/langs/jsx"),
  python: () => import("@shikijs/langs/python"),
  bash: () => import("@shikijs/langs/bash"),
  json: () => import("@shikijs/langs/json"),
  html: () => import("@shikijs/langs/html"),
  css: () => import("@shikijs/langs/css"),
  yaml: () => import("@shikijs/langs/yaml"),
  markdown: () => import("@shikijs/langs/markdown"),
  sql: () => import("@shikijs/langs/sql"),
} as const;

type SupportedLang = keyof typeof LANG_LOADERS;

const LANG_ALIASES: Record<string, SupportedLang> = {
  ts: "typescript",
  js: "javascript",
  py: "python",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  yml: "yaml",
  md: "markdown",
};

const FALLBACK_LANG: SupportedLang = "typescript";

const resolveLang = (raw: string | undefined): SupportedLang => {
  if (!raw) return FALLBACK_LANG;
  const normalized = raw.toLowerCase();
  if (normalized in LANG_LOADERS) return normalized as SupportedLang;
  if (normalized in LANG_ALIASES) return LANG_ALIASES[normalized];
  return FALLBACK_LANG;
};

let highlighterPromise: Promise<HighlighterCore> | null = null;

const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [import("@shikijs/themes/github-dark")],
      langs: Object.values(LANG_LOADERS).map((load) => load()),
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
};

export const shikiCoreTransformer = (): Transformer => async ($) => {
  const preElements = $("pre");
  if (preElements.length === 0) return;

  const highlighter = await getHighlighter();

  preElements.each((_, preElement) => {
    const $pre = $(preElement);
    const $code = $pre.find("code");
    const code = $code.text();
    const className = $code.attr("class") ?? "";
    const rawLang = className.replace("language-", "").trim();
    const lang = resolveLang(rawLang);

    const html = highlighter.codeToHtml(code, {
      lang,
      theme: THEME,
    });
    $pre.replaceWith(html);
  });
};
