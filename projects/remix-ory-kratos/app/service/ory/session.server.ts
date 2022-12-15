import { redirect, type LoaderFunction } from "@remix-run/node";
import { parse } from "cookie";

async function requireUserSession(
    request: Request,
    next: (session: string) => ReturnType<LoaderFunction>
) {
    // mise-en-scene
    const KRATOS_BASE_URL = process.env["KRATOS_PUBLIC_URL"];
    const cookies = request.headers.get("Cookie");

    // check for session cookie
    if (cookies) {
        const parsedCookies = parse(cookies);
        const kratosSession = parsedCookies["ory_kratos_session"];

        // check for ory_kratos_session
        // no session, redirect to Kratos login flow request
        if (kratosSession === undefined) {
            return redirect(`${KRATOS_BASE_URL}/self-service/login/browser`);
        }
        // valid session
        return next(kratosSession);
    }
    return;
}

export { requireUserSession };
