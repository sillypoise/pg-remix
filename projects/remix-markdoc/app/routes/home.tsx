import { Link, Outlet } from "@remix-run/react";

export default function Index() {
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <h1>Remix + Markdoc</h1>
            <p>We need to test links:</p>
            <ul>
                <li>
                    Plain old{" "}
                    <a href="/test">
                        <code>a</code> tag
                    </a>
                    , pre-fetching
                </li>
                <li>
                    <Link to="/test" prefetch="intent">
                        Cool new Remix link
                    </Link>
                </li>
            </ul>
            <p>We will render some markdown in the outlet below</p>
            <Outlet />
        </div>
    );
}
