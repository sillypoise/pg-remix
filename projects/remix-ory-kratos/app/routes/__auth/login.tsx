import { redirect, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { parse } from "cookie";

export async function loader({ request }: LoaderArgs) {
    // mise-en-scene
    const KRATOS_BASE_URL = process.env["KRATOS_PUBLIC_URL"];
    const url = new URL(request.url);
    const cookies = request.headers.get("Cookie");

    // parse URL search params:check for flow-id
    const flow = url.searchParams.get("flow");
    if (flow === null) {
        // create new login flow
        return redirect(`${KRATOS_BASE_URL}/self-service/login/browser`);
    }

    // handler req with flow-id
    if (cookies) {
        const parsedCookies = parse(cookies);
        const cookiesKeys = Object.keys(parsedCookies);

        // check for csrf token
        const csrfTokenKey = cookiesKeys.find((key) =>
            key.startsWith("csrf_token_")
        );
        if (csrfTokenKey) {
            const csrfCookie = `${csrfTokenKey}=${parsedCookies[csrfTokenKey]}`;
            // TODO: refactor into model function
            const resUi = await fetch(
                `${KRATOS_BASE_URL}/self-service/login/flows?id=${flow}`,
                {
                    headers: {
                        Cookie: csrfCookie,
                    },
                }
            );
            console.dir(resUi, { depth: 2 });
            //! TODO: handle expired flow path
            let data = await resUi.json();
            console.dir(data, { depth: 2 });
            return { ui: data.ui };
        }
    }

    return {};
}

export default function Login() {
    // TODO: make form POST through JavaScript with Remix
    //! TODO: refactor UI rendering into separate component
    // TODO handle wrong credentials UI
    const { ui } = useLoaderData(); // TODO: Type UI nodes response

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Login Route!</h1>
                <p>Implementing login with Ory</p>
                <form action={ui.action} method={ui.method}>
                    <fieldset className="stack items-start">
                        {ui.nodes.map((node) => {
                            const { attributes, meta, message } = node;
                            if (attributes.name === "csrf_token") {
                                return (
                                    <input
                                        key={attributes.name}
                                        name={attributes.name}
                                        type={attributes.type}
                                        value={attributes.value}
                                        required={attributes.required}
                                        disabled={attributes.disabled}
                                    />
                                );
                            } else if (attributes.name === "identifier") {
                                return (
                                    <>
                                        <label
                                            key={meta.label.id + 1}
                                            // ! not good ↑
                                        >
                                            {meta.label.text}
                                        </label>
                                        <input
                                            key={meta.label.id}
                                            name={attributes.name}
                                            type={attributes.type}
                                            // value={attributes.value}
                                            required={attributes.required}
                                            disabled={attributes.disabled}
                                            className="bg-scheme-dark-neutral-surface-3"
                                        />
                                    </>
                                );
                            } else if (attributes.name === "password") {
                                return (
                                    <>
                                        <label
                                            key={meta.label.id + 1}
                                            // ! not good ↑
                                        >
                                            {meta.label.text}
                                        </label>
                                        <input
                                            key={meta.label.id}
                                            name={attributes.name}
                                            type={attributes.type}
                                            required={attributes.required}
                                            disabled={attributes.disabled}
                                            className="bg-scheme-dark-neutral-surface-3"
                                        />
                                    </>
                                );
                            } else if (attributes.name === "method") {
                                return (
                                    <button
                                        key={meta.label.id}
                                        name={attributes.name}
                                        type={attributes.type}
                                        value={attributes.value}
                                        disabled={false}
                                        className="bg-scheme-dark-neutral-surface-3"
                                    >
                                        {meta.label.text}
                                    </button>
                                );
                            } else {
                                return <p key={4}>no ui data 😑</p>;
                            }
                        })}
                    </fieldset>
                </form>
                <pre>{JSON.stringify(ui, null, 4)}</pre>
            </article>
        </main>
    );
}
