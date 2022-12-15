import { createCookie, createCookieSessionStorage } from "@remix-run/node";

const kratosSession = createCookie("ory_kratos_session", {});
// const { getSession } = createCookieSessionStorage({
//     cookie: {

//     }
// })

export { kratosSession };
