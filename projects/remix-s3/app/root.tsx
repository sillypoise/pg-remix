import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import tailwind from "./styles/tailwind.css";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Remix S3",
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
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}