import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

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

export let action: ActionFunction = async ({ request }) => {
    try {
        let formData = await request.formData();
        let { firstName, lastName } = Object.fromEntries(formData);
        if (typeof firstName === "string" && typeof lastName === "string") {
            addPerson(firstName, lastName);
        }
        return {};
    } catch (e) {
        return {
            error: "Failed to write data",
            message:
                "Something happened, we couldn't add your item, try again.",
        };
    }
};

export default function DataMutation() {
    let people = useLoaderData();

    return (
        <main>
            <Link to="/">Back 🏠</Link>
            <article className="stack">
                <h2>Basic data mutation</h2>
                <p>
                    What about <strong>writing</strong> data, i.e. data{" "}
                    <strong>mutations</strong>. Well Remix also has great APIs
                    to solve this. Specifcially through the <code>Form</code>{" "}
                    component, which is basically and enhanced version of HTML's{" "}
                    <code>{`<form>`}</code>.
                </p>
                <p>
                    To better understand Remix's API it's best to concieve{" "}
                    <code>Form</code> as a standard declarative mutation, i.e. a
                    way to perform a <code>POST</code> request. That is to say,
                    you can have a <code>Form</code> with hidden{" "}
                    <code>input</code>s and that will be equivalent to making a
                    fetch request to your Route.
                </p>
                <p>
                    The handler for that route, i.e. the API handler for the
                    given route you're in is written in this same file. You do
                    so by exporting an <code>action</code> function in your
                    route file. Inside this function you have access to a{" "}
                    <code>request</code> object.
                </p>
                <p>
                    Inside this <code>request</code> object we have access to{" "}
                    <code>formData</code> which holds serialized data we send
                    from our <code>Form</code> component. Remix takes care of
                    serailizing user input data, or more accurately, client-side
                    data, for our server. In the server, i.e. the{" "}
                    <code>action</code> function we can do all the things we
                    normally do in web application handlers.
                </p>
                <ul>
                    <li>Validate and sanitize inputs</li>
                    <li>Make database operations with client-data</li>
                    <li>Create mutations with client-data</li>
                    <li>...etc</li>
                </ul>
                <p>
                    Think of <code>Form</code> as an way to perform{" "}
                    <code>POST</code> requests to your API route
                </p>
                <p>
                    Now a very <strong>important</strong> thing to note about
                    mutations in Remix is that anytime we perform a mutation,
                    i.e. perform a <code>submit</code> action. Remix will handle
                    the client-side data invalidation. In other words, Remix
                    will re-load the data from the server, in order to keep the
                    client in sync with the server's data. It will essentially
                    run the
                    <code>loader</code> function for you. This is very cool
                    because we don't have to write any logic to handle what is
                    usally a pesky problem of client side data
                </p>
                <p>
                    See this for yourself by adding a new person to the list
                    below. Notice it will immediately update the data we load
                    in.
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

                        <Form
                            className="stack [--stack-gap:theme(spacing.2xs)]"
                            method="post"
                        >
                            <label htmlFor="firstName">First name</label>
                            <input type="text" name="firstName" />
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" />
                            <button type="submit">➕</button>
                        </Form>
                    </article>
                </div>
            </article>
        </main>
    );
}
