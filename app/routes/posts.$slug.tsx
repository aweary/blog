import { Loader, LinksFunction, json } from "@remix-run/data";
import { useRouteData } from "@remix-run/react";
import * as Remark from "../remark.server";
import { octokit } from "../github.server";

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/prism-theme-night-owl@1.4.0/build/style.css",
    },
  ];
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
  return (
    <div>
      <h1>{data.data.title}</h1>
      <span dangerouslySetInnerHTML={{ __html: data.contents }} />
    </div>
  );
}
