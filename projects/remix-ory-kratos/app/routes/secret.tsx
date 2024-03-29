import { type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserSession } from "~/service/ory/session.server";

export async function loader({ request }: LoaderArgs) {
    return requireUserSession(request, async (session) => {
        return { session };
    });
}

export default function Secret() {
    let data = useLoaderData();
    return (
        <main className="mlb-l article center stack">
            <h1 className="text-2">Secret info 🤫</h1>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </main>
    );
}
