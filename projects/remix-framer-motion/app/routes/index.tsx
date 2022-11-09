import { Link, useLocation } from "@remix-run/react";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import WipeTransition from "./components/WipeTransition";

export default function Index() {
    let isPresent = useIsPresent();
    let location = useLocation();
    return (
        <main className="mlb-l">
            {/* <WipeTransition /> */}
            <article className="center stack max-is-[50ch]">
                <h1 className="text-3">Remix + Framer Motion</h1>
                <p>Let's do some animation in React!</p>
            </article>
        </main>
    );
}
