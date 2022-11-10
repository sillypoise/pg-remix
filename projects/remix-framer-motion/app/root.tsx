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
    useOutlet,
} from "@remix-run/react";
import {
    AnimatePresence,
    usePresence,
    motion,
    useIsPresent,
} from "framer-motion";
import { useEffect } from "react";
import WipeTransition from "./routes/components/WipeTransition";

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
    let isPresent = useIsPresent();

    console.log(isPresent);

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
                {/* <AnimatePresence mode="wait" initial={false}>
                    <WipeTransition key={location.key} />
                </AnimatePresence> */}
                {/* <AnimatePresence mode="wait" initial={false}> */}
                {/* <Outlet /> */}
                {outlet}
                {/* </AnimatePresence> */}
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
