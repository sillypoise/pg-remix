import { type ActionArgs, type LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

const KRATOS_BASE_URL = console.log(process.env["KRATOS_PUBLIC_URL"]);

export async function loader({ request, params }: LoaderArgs) {
    const url = new URL(request.url);
    const flow = url.searchParams.get("flow");
    if (!flow)
        return redirect(`${KRATOS_BASE_URL}/self-service/registration/browser`);
    // console.log(flow);
    // console.log(request.headers.get("Cookie"));
    const csrfToken = request.headers.get("Cookie");
    // console.log("REQ", request);

    if (!csrfToken) return { error: "no csrf cookie returned from Kratos API" };

    const resUi = await fetch(
        `${KRATOS_BASE_URL}/self-service/registration/flows?id=${flow}`,
        {
            headers: {
                Cookie: csrfToken,
            },
        }
    );
    let data = await resUi.json();

    console.log(data.ui);

    return { ui: data.ui };
}

export default function Registration() {
    const { ui } = useLoaderData();
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
                <pre>{JSON.stringify(ui, null, 4)}</pre>
                <form action={ui.action} method={ui.method}>
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
                </form>
            </article>
        </main>
    );
}
