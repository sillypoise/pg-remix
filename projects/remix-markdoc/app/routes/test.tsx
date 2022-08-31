import { Link } from "@remix-run/react";

export function loader() {
    return {
        data: {
            hello: "world",
        },
    };
}

export default function Test() {
    return (
        <main>
            <article>
                <p>
                    Just a test to see if links are using the proper{" "}
                    <code>Link</code> component for client-side links.
                </p>
                <p>
                    <Link to="/home">Linkeroni</Link>
                </p>
            </article>
        </main>
    );
}
