import { raw } from "hono/html";
import {
  microCMSRichEditorHandler,
  responsiveImageTransformer,
  tocExtractor,
} from "microcms-rich-editor-handler";
import { shikiCoreTransformer } from "../libs/shikiTransformer";
import { optimizeRichEditorImages } from "../utils/microcmsImageUrl";

type Props = {
  body: string;
};

export const MarkdownTemplate = async ({ body }: Props) => {
  const _body = optimizeRichEditorImages(body);
  const { html, data } = await microCMSRichEditorHandler(
    _body, // MicroCMSから取得したデータのリッチエディタのHTML文字列
    {
      transformers: [responsiveImageTransformer(), shikiCoreTransformer()],
      extractors: {
        toc: [tocExtractor(), { phase: "before" }],
      },
    },
  );

  return <div class="md">{raw(html)}</div>;
};
