import WipeTransition from "./components/WipeTransition";
import { motion, useIsPresent } from "framer-motion";
import { useLocation } from "@remix-run/react";

export default function PageA() {
    let isPresent = useIsPresent();
    let location = useLocation();
    return (
        <main className="mlb-l">
            <article className="center stack max-is-[50ch] cover">
                <h2 className="text-3">A</h2>
            </article>
        </main>
    );
}
