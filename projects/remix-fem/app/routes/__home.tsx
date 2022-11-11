import { Outlet } from "@remix-run/react";

export default function Index() {
    return (
        <main className="mlb-l">
            <Outlet />
        </main>
    );
}
