import { HeadersFunction, Link, useRouteData } from "@remix-run/react";
import { Loader } from "@remix-run/data";
import { Octokit } from "@octokit/rest";
import * as Remark from "../remark.server";
import fs from "fs/promises";

const octokit = new Octokit();

export const headers: HeadersFunction = async () => {
  return {
    "Cache-Control": "max-age=60, stale-while-revalidate=360",
  };
};

export const loader: Loader = async () => {
  const response = await octokit.repos.getContent({
    owner: "aweary",
    repo: "blog",
    path: `content`,
  });
  const data = await Promise.all(
    response.data.map(async ({ download_url, name }) => {
      if (process.env.NODE_ENV === "development") {
        const content = (await fs.readFile(`content/${name}`)).toString(
          "utf-8"
        );
        const markdown = await Remark.compile(content);
        return { ...markdown.data, url: `/posts/${name.split(".md")[0]}` };
      }
      const content = await (await fetch(download_url)).text();
      const markdown = await Remark.compile(content);
      return { ...markdown.data, url: `/posts/${name.split(".md")[0]}` };
    })
  );
  console.log(data);
  return data;
};

export default function Posts() {
  const data = useRouteData();
  return (
    <ul>
      {data.map((item) => {
        return (
          <li key={item.url}>
            <Link to={item.url}>{item.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
