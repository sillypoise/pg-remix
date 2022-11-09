import { Link } from "@remix-run/react";
import WipeTransition from "./components/WipeTransition";

export default function Index() {
    return (
        <main className="mlb-l">
            <WipeTransition />
            <article className="center stack max-is-[50ch]">
                <h1 className="text-3">Remix + Framer Motion</h1>
                <p>Let's do some animation in React!</p>
            </article>
        </main>
    );
}
