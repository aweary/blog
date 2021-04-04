import { HeadersFunction, Link, useRouteData } from "@remix-run/react";
import { Loader, json } from "@remix-run/data";
import { Octokit } from "@octokit/rest";
import * as Remark from "../remark.server";
// import fs from "fs/promises";

const octokit = new Octokit();

export function headers({ loaderHeaders }: { loaderHeaders: Headers }) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
}

export const loader: Loader = async () => {
  const response = await octokit.repos.getContent({
    owner: "aweary",
    repo: "blog",
    path: `content`,
  });
  let data = await Promise.all(
    response.data.map(async ({ download_url, name }) => {
      if (process.env.NODE_ENV === "development") {
        const fs = require("fs");
        const content = fs.readFileSync(`content/${name}`).toString("utf-8");
        const markdown = await Remark.compile(content);
        return { ...markdown.data, url: `/posts/${name.split(".md")[0]}` };
      }
      const content = await (await fetch(download_url)).text();
      const markdown = await Remark.compile(content);
      return { ...markdown.data, url: `/posts/${name.split(".md")[0]}` };
    })
  );
  data = data.filter((post) => post.date != null);
  return json(data, {
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=604800",
    },
  });
};

export default function Posts() {
  const data = useRouteData();
  return (
    <ul className="posts">
      {data.map((item) => {
        return (
          <li key={item.url}>
            <Link to={item.url}>
              <h2>{item.title}</h2>
              <span>{item.description}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
