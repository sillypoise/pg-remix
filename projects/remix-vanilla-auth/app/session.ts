import { createCookieSessionStorage } from "@remix-run/node";

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

export { getSession, commitSession, destroySession };
