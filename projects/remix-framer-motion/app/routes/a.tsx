import { Outlet } from "@remix-run/react";

export default function PageA() {
    return (
        <article className="center stack max-is-[50ch] cover">
            <h2 className="text-3">A</h2>
            <Outlet />
        </article>
    );
}
