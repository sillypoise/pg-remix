import { type LoaderArgs } from "@remix-run/node";
import { requireUserSession } from "~/session.server";

// export function loader({ request }: LoaderArgs) {
//     return requireUserSession(request, (session) => {
//         return { lol: true };
//     });
// }

export function loader({ request }: LoaderArgs) {
    return {};
}

export default function Secret() {
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h2>Supah secret information only for authorized personel</h2>
            </article>
        </main>
    );
}
