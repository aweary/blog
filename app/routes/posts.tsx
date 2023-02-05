// Layout route
import { Outlet } from "@remix-run/react";

export default function Post() {
  return (
    <main className="post">
      <Outlet />
    </main>
  )
}