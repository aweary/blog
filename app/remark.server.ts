// import remark from "remark";
// import html from "remark-html";
// @ts-ignore
import headings from "remark-autolink-headings";
// @ts-ignore
import slug from "remark-slug";
import frontmatter from "remark-frontmatter";
import extract from "remark-extract-frontmatter";
import { parse as parseYAML } from "yaml";
// @ts-ignore
// import prism from "remark-prism";
// Import to force this into the module graph
import "prismjs/components/prism-markup";
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
// @ts-ignore
import highlight from "rehype-highlight";
import html from "rehype-stringify";
import gfm from "remark-gfm";

interface ParsedMarkdown {
  contents: string;
  data: { [key: string]: any };
}

export async function compile(input: string): Promise<ParsedMarkdown> {
  const content = await unified()
    // @ts-ignore
    .use(frontmatter, ["yaml", "toml"])
    .use(extract, { yaml: parseYAML })
    // @ts-ignore
    .use(slug)
    .use(headings, {
      behavior: "wrap",
      linkProperties: {
        class: "heading-link",
      },
    })
    .use(markdown)
    .use(gfm)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(highlight)
    .use(html, { allowDangerousHtml: true })
    .process(input);
  return content as ParsedMarkdown;
}
