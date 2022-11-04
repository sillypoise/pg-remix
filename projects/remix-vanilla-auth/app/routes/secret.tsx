import { type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserSession } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
    return requireUserSession(request, async (session) => {
        return { session };
    });
}

export default function Secret() {
    let session = useLoaderData();
    console.dir(session);
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h2>Supah secret information only for authorized personel</h2>
                <pre>{JSON.stringify(session, null, 4)}</pre>
                <Link to="/logout">logout</Link>
            </article>
        </main>
    );
}
