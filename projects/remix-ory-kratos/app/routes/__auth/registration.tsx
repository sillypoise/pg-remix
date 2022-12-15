import { type LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { parse } from "cookie";

export async function loader({ request, params }: LoaderArgs) {
    // mise-en-scene
    const KRATOS_BASE_URL = process.env["KRATOS_PUBLIC_URL"];
    const url = new URL(request.url);
    const cookies = request.headers.get("Cookie");

    // parse URL search params and check for flow value
    const flow = url.searchParams.get("flow");
    if (flow === null)
        // request Kratos new registration flow
        return redirect(`${KRATOS_BASE_URL}/self-service/registration/browser`);

    // handle requests with flow-id
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
                `${KRATOS_BASE_URL}/self-service/registration/flows?id=${flow}`,
                {
                    headers: {
                        Cookie: csrfCookie,
                    },
                }
            );
            //! TODO: handle expired flow path
            let data = await resUi.json();
            console.dir(data, { depth: 2 });
            return { ui: data.ui };
        }
    }
    return {};
}

export default function Registration() {
    // TODO: make form POST through JavaScript with Remix
    //! TODO: refactor UI rendering into separate component
    const { ui } = useLoaderData(); // TODO: Type UI nodes response (hard given conditionals in loader)

    const csrfNode = ui.nodes.filter(({ group }) => group === "default");
    const uiNodes = ui.nodes.filter(
        ({ group, attributes }) =>
            attributes.type !== "submit" && group === "password"
    );
    const uiSubmit = ui.nodes.filter(
        ({ attributes }) => attributes.type === "submit"
    );

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Registration Route!</h1>
                <p>Ory should redirect us here</p>
                <form action={ui.action} method={ui.method}>
                    <fieldset>
                        <fieldset className="stack items-start">
                            {/* //* render hidden csrf input  */}
                            {csrfNode.map(({ attributes }) => (
                                <input
                                    key={32}
                                    name={attributes.name}
                                    type={attributes.type}
                                    value={attributes.value}
                                    required={attributes.required}
                                    disabled={attributes.disabled}
                                />
                            ))}
                            {/* //* render signup ui  */}
                            {uiNodes.map(({ attributes, messages, meta }) => (
                                <>
                                    <label htmlFor="">{meta.label.text}</label>
                                    <input
                                        key={meta.id}
                                        type={attributes.type}
                                        name={attributes.name}
                                        required={attributes.required}
                                        disabled={attributes.disabled}
                                        className="bg-scheme-dark-neutral-surface-3"
                                        value={
                                            attributes.value
                                                ? attributes.value
                                                : undefined
                                        }
                                    />
                                </>
                            ))}
                            {/* //* render submit button */}
                            {uiSubmit.map(({ attributes, messages, meta }) => (
                                <button
                                    key={attributes.key}
                                    type={attributes.type}
                                    name={attributes.name}
                                    disabled={attributes.disabled}
                                    value={attributes.value}
                                    className="bg-scheme-dark-neutral-surface-3"
                                >
                                    {meta.label.text}
                                </button>
                            ))}
                        </fieldset>
                    </fieldset>
                </form>
                <pre>{JSON.stringify(ui, null, 4)}</pre>
            </article>
        </main>
    );
}
