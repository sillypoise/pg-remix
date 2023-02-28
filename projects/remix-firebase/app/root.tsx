import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import tailwind from "./styles/tailwind.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: tailwind }];
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Remix + Firebase",
    viewport: "width=device-width,initial-scale=1",
});

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
