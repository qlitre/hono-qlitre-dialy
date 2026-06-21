import { createRoute } from "honox/factory";
import { getMicroCMSClient, getPostDetail } from "../../../libs/microcms";
import { jstDatetime } from "../../../utils/jstDatetime";

function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "#### $1\n\n")
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
    .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)")
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)")
    .replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, "\n*$1*\n")
    .replace(/<\/?figure[^>]*>/gi, "\n")
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
    .replace(/<\/?[uo]l[^>]*>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default createRoute(async (c) => {
  const id = c.req.param("id") || "";
  const client = getMicroCMSClient(c);
  const post = await getPostDetail({ client, contentId: id });
  let mdText = "";
  if (post.useRepeatedBody) {
    for (const body of post.repeatedBody) {
      if (body.fieldId === "richEditor") {
        mdText += htmlToMarkdown(body.richText) + "\n\n";
      } else if (body.fieldId === "amazonLink") {
        mdText += `**[${body.productName}](${body.productLink})**\n[Amazonで購入する](${body.productLink})\n\n`;
      }
    }
  } else {
    mdText = htmlToMarkdown(post.text);
  }

  const tags = [];
  for (const tag of post.tag) {
    tags.push(tag.name);
  }

  const lines: string[] = [
    `# ${post.title}`,
    "",
    `**公開日**: ${jstDatetime(post.publishedAt)}`,
    `**カテゴリー**: ${post.category.name}`,
    `**タグ**: ${tags.join(",")}`,
  ];
  lines.push("", "---", "", mdText);

  return c.text(lines.join("\n"), 200, {
    "Content-Type": "text/markdown; charset=utf-8",
  });
});
