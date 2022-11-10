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
    useTransition,
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
                        <li>
                            <NavLink to="/menu">Nav animation</NavLink>
                        </li>
                    </ul>
                </nav>
                <ScrollRestoration />
                <AnimatePresence mode="wait" initial={false}>
                    <WipeTransition key={location.key} />
                </AnimatePresence>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.main
                        key={location.key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.65 }}
                        className="mlb-l"
                    >
                        {outlet}
                    </motion.main>
                </AnimatePresence>
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
