import type { MetaFunction } from "@remix-run/node";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
} from "@remix-run/react";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import tailwind from "./styles/tailwind.css";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
});

export function links() {
    return [
        {
            href: tailwind,
            rel: "stylesheet",
        },
    ];
}

export default function App() {
    let location = useLocation();

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <nav>
                    <ul role="list" className="cluster">
                        <li>
                            <Link to="/">home</Link>
                        </li>
                        <li>
                            <Link to="/a">A</Link>
                        </li>
                        <li>
                            <Link to="/b">B</Link>
                        </li>
                    </ul>
                </nav>
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
