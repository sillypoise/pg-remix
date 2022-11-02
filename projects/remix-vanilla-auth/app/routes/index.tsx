import { json, redirect, type LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { commitSession, getSession, getUserSession } from "~/session.server";

// export async function loader({ request }: LoaderArgs) {
//     let session = await getSession(request.headers.get("Cookie"));

//     if (session.has("userExists")) {
//         return redirect("/secret");
//     }

//     // assumes there is an error
//     let data = { error: session.get("error") };

//     return json(data, {
//         headers: {
//             "Set-Cookie": await commitSession(session),
//         },
//     });
// }

export default function Index() {
    // let { userSession } = useLoaderData();
    // console.log(userSession);

    return (
        <main className="mlb-l">
            <article className="center stack">
                <h2>Auth remix.</h2>
                <Link to="/login">Go to login</Link>
                <p>session:</p>
                {/* <pre>{JSON.stringify(userSession, null, 4)}</pre> */}
            </article>
        </main>
    );
}

// function SignUp() {
//     return (
//         <>
//             <h3>Sign Up!</h3>
//             <Form action="" className="stack">
//                 <label htmlFor="signup:email">Username:</label>
//                 <input
//                     type="email"
//                     name="signup:email"
//                     id="signup:email"
//                     className="max-is-[20ch] rounded-md p-3xs"
//                 />
//                 <label htmlFor="signup:pw">Password</label>
//                 <input
//                     type="password"
//                     name="signup:password"
//                     id="signup:password"
//                     className="max-is-[20ch] rounded-md p-3xs"
//                 />
//                 <button
//                     type="submit"
//                     className="max-is-[20ch] rounded-md bg-dark-gray-5 hover:bg-dark-gray-6"
//                 >
//                     Sign me up!
//                 </button>
//             </Form>
//         </>
//     );
// }
