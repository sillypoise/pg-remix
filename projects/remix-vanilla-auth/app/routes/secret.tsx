import { type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllUsers } from "~/models/session.model.server";
import { requireUserSession } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
    return requireUserSession(request, async (session) => {
        let users = await getAllUsers();
        console.dir(await users);
        return { users };
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
            </article>
        </main>
    );
}
