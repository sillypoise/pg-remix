import { type LoaderArgs } from "@remix-run/node";

export function loader({ request }: LoaderArgs) {
    return {};
}

export default function Login() {
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Login Route!</h1>
                <p>Implementing login with Ory</p>
                {/* <pre>{JSON.stringify(ui, null, 4)}</pre> */}
            </article>
        </main>
    );
}
