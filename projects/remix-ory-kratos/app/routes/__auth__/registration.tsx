import { LoaderArgs, redirect } from "@remix-run/node";
import { kratos } from "~/service/ory";

export async function loader({ request, params }: LoaderArgs) {
    // console.log(process.env["KRATOS_PUBLIC_URL"]);
    // let res = await fetch(
    //     "http://localhost:4433/self-service/registration/browser",
    //     {
    //         headers: {
    //             Accept: "application/json",
    //         },
    //     }
    // );
    // console.log(res);

    const url = new URL(request.url);
    const flow = url.searchParams.get("flow");
    if (!flow)
        return redirect(
            "http://localhost:4433/self-service/registration/browser"
        );
    console.log(flow);
    console.log(request.headers.get("Cookie"));
    const csrfToken = request.headers.get("Cookie");

    if (!csrfToken) return { error: "no csrf cookie returned from Kratos API" };

    const resUi = await fetch(
        `http://localhost:4433/self-service/registration/flows?id=${flow}`,
        {
            headers: {
                Cookie: csrfToken,
            },
        }
    );
    let ui = await resUi.json();

    console.log(ui);

    return {};
}

export default function Registration() {
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h1 className="text-3">Registration Route!</h1>
                <p>Ory should redirect us here</p>
            </article>
        </main>
    );
}
