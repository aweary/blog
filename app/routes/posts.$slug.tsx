import { Loader, HeadersFunction, json } from "@remix-run/data";
import { useRouteData } from "@remix-run/react";
import * as Remark from "../remark.server";
import { Octokit } from "@octokit/rest";
import fs from "fs/promises";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export const headers: HeadersFunction = async ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
};

export const loader: Loader = async ({ params }) => {
  let content = "";
  if (process.env.NODE_ENV === "development") {
    content = (await fs.readFile(`content/${params.slug}.md`)).toString(
      "utf-8"
    );
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
      "Cache-Control": "no-cache",
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
