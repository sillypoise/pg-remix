import {
    createCookieSessionStorage,
    redirect,
    type LoaderFunction,
} from "@remix-run/node";

interface UserSession {
    lol: boolean;
}

let COOKIE_SECRET = process.env["COOKIE_SECRET"];

if (!COOKIE_SECRET) {
    throw new Error("You need to set a COOKIE_SECRET environment variable");
}

let { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: "zesh",
        secrets: [COOKIE_SECRET],
        sameSite: "lax",
    },
});

// *
async function getUserSession() {
    // return { lol: true };
    return null;
}

// * This function will guard routes that need authentication. If there is a session it will run the callback function, else it will re-direct to `/login`

export function requireUserSession(
    request: Request,
    next: (session: UserSession) => ReturnType<LoaderFunction>
) {
    // let session = { lol: true };
    let session = null;
    if (!session) {
        return redirect("/login");
    }
    return next(session);
}

export { getSession, commitSession, destroySession, getUserSession };
