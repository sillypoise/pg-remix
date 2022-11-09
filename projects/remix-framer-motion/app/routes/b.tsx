import { useLocation } from "@remix-run/react";
import WipeTransition from "./components/WipeTransition";

export default function PageB() {
    let location = useLocation();
    return (
        <main className="mlb-l">
            <article className="center stack max-is-[50ch] cover">
                <h2 className="text-3">B</h2>
            </article>
        </main>
    );
}
