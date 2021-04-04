import { Loader, LinksFunction, MetaFunction, json } from "@remix-run/data";
import { useRouteData } from "@remix-run/react";
import * as Remark from "../remark.server";
import { octokit } from "../github.server";
import { format } from "date-fns";

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/highlight.js@10.7.1/styles/a11y-dark.css",
      media: "(prefers-color-scheme: dark)",
    },
    {
      rel: "stylesheet",
      href: "https://unpkg.com/highlight.js@10.7.1/styles/a11y-light.css",
      media: "(prefers-color-scheme: light)",
    },
  ];
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.data.title,
    description: data.data.description,
  };
};

export function headers({ loaderHeaders }: { loaderHeaders: Headers }) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
}

export const loader: Loader = async ({ params }) => {
  let content = "";
  if (process.env.NODE_ENV === "development") {
    const fs = require("fs");
    content = fs.readFileSync(`content/${params.slug}.md`).toString("utf-8");
  } else {
    const {
      // @ts-ignore
      data: { download_url },
    } = await octokit.repos.getContent({
      owner: "aweary",
      repo: "blog",
      path: `content/${params.slug}.md`,
    });
    content = await (await fetch(download_url)).text();
  }
  const markdown = await Remark.compile(content);
  return json(markdown, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=604800",
    },
  });
};

export default function SlugRoute() {
  const data = useRouteData();
  const date = data.data.date
    ? format(new Date(data.data.date), "LLLL do, yyyy")
    : "(Draft)";
  return (
    <div>
      <h1>{data.data.title}</h1>
      <h2 className="subtitle">{date}</h2>
      <span dangerouslySetInnerHTML={{ __html: data.contents }} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.querySelectorAll('code').forEach(node => {
            node.tabIndex = 0;
          })
        `,
        }}
      />
    </div>
  );
}
