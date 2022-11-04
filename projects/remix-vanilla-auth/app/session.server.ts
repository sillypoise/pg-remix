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

// * Let's create a few helper functions
async function createUserSession(userId: string, redirectTo: string) {
    let session = await getSession();
    session.set("userId", userId);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

async function requireUserSession(
    request: Request,
    next: (session: string) => ReturnType<LoaderFunction>
) {
    let session = await getSession(request.headers.get("Cookie"));
    let userSession = session.get("userId");
    // No session, back to login you go
    if (!userSession) {
        return redirect("/login");
    }
    // We have a session, run the callback response with custom logic, e.g. call db with session id
    return next(userSession);
}

// *
async function getUserSession() {
    // return { lol: true };
    return null;
}

// * This function will guard routes that need authentication. If there is a session it will run the callback function, else it will re-direct to `/login`

export function requiresUserSession(
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

export {
    getSession,
    commitSession,
    destroySession,
    getUserSession,
    requireUserSession,
    createUserSession,
};
