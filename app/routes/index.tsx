import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  HeadersFunction,
} from "@remix-run/react";
import { useRouteData } from "@remix-run/react";

import styles from "url:../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Brandon Dail",
    description: "",
  };
};

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=60, stale-while-revalidate=360",
    // "Content-Security-Policy": "default-src 'self'",
    // "X-XSS-Protection": "1",
    // "X-Frame-Options": "DENY",
    // "X-Content-Type-Options": "nosniff",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export let loader: LoaderFunction = () => {
  return { message: "this is awesome 😎" };
};

export default function Index() {
  let data = useRouteData();

  return (
    <div style={{ paddingTop: 12 }}>
      <h1>
        Senior Software Engineer working accessibility at{" "}
        <a href="https://www.discord.com">Discord</a>
      </h1>
    </div>
  );
}
