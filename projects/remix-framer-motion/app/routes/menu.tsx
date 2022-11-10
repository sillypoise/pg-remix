import { Outlet } from "@remix-run/react";

export default function Menu() {
    return (
        <article className="center stack">
            <h2 className="text-2">Testing a mobile nav animation</h2>
            <Outlet />
        </article>
    );
}
