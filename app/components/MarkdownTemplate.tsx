import { raw } from "hono/html";
import {
  microCMSRichEditorHandler,
  responsiveImageTransformer,
  tocExtractor,
  codeBlockFileNameTransformer,
  syntaxHighlightingByShikiTransformer,
} from "microcms-rich-editor-handler";

type Props = {
  body: string;
};

export const MarkdownTemplate = async ({ body }: Props) => {
  const { html, data } = await microCMSRichEditorHandler(
    body, // MicroCMSから取得したデータのリッチエディタのHTML文字列
    {
      transformers: [
        responsiveImageTransformer(),
        codeBlockFileNameTransformer(), // ファイル名を表示
        syntaxHighlightingByShikiTransformer({
          highlightOptions: {
            html: {
              lang: "html",
              theme: "github-dark",
            },
            typescript: {
              lang: "typescript",
              theme: "github-dark",
            },
            python: {
              lang: "python",
              theme: "github-dark",
            },
            json: {
              lang: "json",
              theme: "github-dark",
            },
            scss: {
              lang: "scss",
              theme: "github-dark",
            },
            jsx: {
              lang: "jsx",
              theme: "github-dark",
            },
          },
          defaultHighlightOptions: {
            lang: "text",
            theme: "vitesse-dark",
          },
        }),
      ],
      extractors: {
        toc: [tocExtractor(), { phase: "before" }],
      },
    }
  );

  return <div class="md">{raw(html)}</div>;
};
