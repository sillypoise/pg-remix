import { Outlet } from "@remix-run/react";

export default function Index() {
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <h1>Remix + Markdoc</h1>
            <p>We will render some markdown in the outlet below</p>
            <Outlet />
        </div>
    );
}
