import type { MetaFunction } from "@remix-run/node";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    NavLink,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
    useMatches,
    useOutlet,
} from "@remix-run/react";

import {
    config,
    useTransition as useSpringTransition,
    animated,
} from "react-spring";

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
    let outlet = useOutlet();
    let matches = useMatches();
    console.log(matches);

    let transitions = useSpringTransition(location, {
        from: { opacity: 0, width: "0%" },
        enter: { opacity: 1, width: "100%" },
        leave: { opacity: 0, width: "0%" },
    });

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
                            <NavLink to="/">home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/a">A</NavLink>
                        </li>
                        <li>
                            <NavLink to="/b">B</NavLink>
                        </li>
                    </ul>
                </nav>
                <ScrollRestoration />
                {outlet}
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
