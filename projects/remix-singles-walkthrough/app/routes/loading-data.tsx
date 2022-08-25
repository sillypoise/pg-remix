import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPeople, addPerson } from "~/models/people.model";

export let loader: LoaderFunction = async () => {
    try {
        let people = getPeople();
        return people;
    } catch (e) {
        return {
            errror: "Failed to load data",
            message: "Something happened, we couldn't grab the people list",
        };
    }
};

export default function LoadingData() {
    let people = useLoaderData();

    return (
        <main>
            <Link to="/">Back 🏠</Link>
            <article className="stack">
                <h2>Loading Data into Components</h2>
                <p>
                    Getting server data into your React components. Such a pain
                    in the butt. React Query, RTK Query and SWR are all great
                    solutions for this but Remix offers a native API through its{" "}
                    <code>loader</code> functions which seems to surpass all
                    others in easiness.
                </p>
                <p>
                    First important thing to know is that the{" "}
                    <code>loader</code>
                    function runs in the server. Whatever you{" "}
                    <code>return</code> from the <code>loader</code>
                    function is what will be sent to the client. Yes, Remix
                    simply sends that data to your client whenever it recognizes
                    the route, i.e. the URL of your client app, as it matches a
                    server route. Take a look at the network app, filter for{" "}
                    <code>fetch</code> type requests, and see that whenever we
                    navigate to this page the client makes a request and gets
                    the data we returned in our <code>loader</code>
                    back.
                </p>
                <p>
                    Now to actually access that data in our React component,
                    i.e. client, we simply use the <code>useLoaderData()</code>{" "}
                    hook.
                </p>
                <p>
                    <strong>Note</strong> that inside the <code>loader</code> we
                    can do anything we want to fetch data. We can call different
                    APIs, aggregate and model our data before sending it, or any
                    response you'd like.
                </p>
                <div className="box rounded-md">
                    <article className="stack">
                        {people.length ? (
                            <ul className="stack">
                                {people.map((person: any) => (
                                    <li key={person.rowid}>
                                        {person.firstName} {person.lastName}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No one's knocking at the door</p>
                        )}
                    </article>
                </div>
            </article>
        </main>
    );
}
