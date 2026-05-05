import { raw } from "hono/html";
import {
  microCMSRichEditorHandler,
  responsiveImageTransformer,
  tocExtractor,
} from "microcms-rich-editor-handler";
import { shikiCoreTransformer } from "../libs/shikiTransformer";

type Props = {
  body: string;
};

export const MarkdownTemplate = async ({ body }: Props) => {
  const { html, data } = await microCMSRichEditorHandler(
    body, // MicroCMSから取得したデータのリッチエディタのHTML文字列
    {
      transformers: [responsiveImageTransformer(), shikiCoreTransformer()],
      extractors: {
        toc: [tocExtractor(), { phase: "before" }],
      },
    },
  );

  return <div class="md">{raw(html)}</div>;
};
