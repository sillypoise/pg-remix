import { Link } from "@remix-run/react";

export default function Index() {
    return (
        <main className="mlb-l">
            <article className="center stack max-is-[50ch]">
                <h1 className="text-3">Remix + Framer Motion</h1>
                <p>Let's do some animation in React!</p>
                <nav>
                    <ul>
                        <li>
                            <Link to="/a">A</Link>
                        </li>
                        <li>
                            <Link to="/b">B</Link>
                        </li>
                    </ul>
                </nav>
            </article>
        </main>
    );
}
