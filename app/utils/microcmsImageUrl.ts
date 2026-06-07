type ImageOptions = {
  w?: number;
  h?: number;
  fm?: "webp" | "jpg";
  q?: number;
};

// microCMSの画像APIパラメータ（fm/w/h/q）を付与して配信サイズを縮小する
// 例: getMicrocmsImageUrl(url, { w: 400, fm: 'webp', q: 80 })
export const getMicrocmsImageUrl = (
  url: string,
  opts: ImageOptions = {},
): string => {
  const u = new URL(url);
  if (opts.w) u.searchParams.set("w", String(opts.w));
  if (opts.h) u.searchParams.set("h", String(opts.h));
  if (opts.fm) u.searchParams.set("fm", opts.fm);
  if (opts.q) u.searchParams.set("q", String(opts.q));
  return u.toString();
};

// リッチエディタ本文HTML内のmicroCMS画像 <img src> を最適化URLに書き換える。
// microCMSは取得時に本文画像を変換できないため、描画直前にHTMLを後処理する。
// 既にクエリが付いているURLは（手動指定とみなして）そのまま残す。
export const optimizeRichEditorImages = (html: string): string => {
  return html.replace(
    /(<img\b[^>]*?\bsrc=")(https:\/\/images\.microcms-assets\.io\/[^"]+)(")/g,
    (_match, pre: string, url: string, post: string) => {
      if (url.includes("?")) return `${pre}${url}${post}`;
      return `${pre}${getMicrocmsImageUrl(url, { w: 1000, fm: "webp", q: 80 })}${post}`;
    },
  );
};
