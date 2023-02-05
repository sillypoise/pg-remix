import { Link } from "@remix-run/react";

export default function Test() {
    return (
        <article className="center mlb-l center stack">
            <h1 className="text-2">Welcome weary traveler!</h1>
            <Link to="/">Back</Link>
        </article>
    );
}
