import type { LinksFunction } from "@remix-run/react";
import { Meta, Links, Scripts, Link } from "@remix-run/react";
import { Outlet } from "react-router-dom";

import styles from "url:./styles/global.css";

export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "stylesheet",
      href: "https://use.typekit.net/hok5fki.css",
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <a
            href="https://www.twitter.com/aweary"
            target="_blank"
            aria-label="Brandon Dail's Twitter"
          >
            Twitter
          </a>
        </nav>
        <main>
          <Outlet />
        </main>
        {/* <Scripts /> */}
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Oops!</title>
      </head>
      <body>
        <div>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
          <p>
            Replace this UI with what you want users to see when your app throws
            uncaught errors. The file is at <code>app/App.tsx</code>.
          </p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
