import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";

import { getPeople, addPerson, deletePerson } from "~/models/people.model";

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
        let { _action, firstName, lastName, personID } =
            Object.fromEntries(formData);

        if (_action === "create") {
            if (typeof firstName === "string" && typeof lastName === "string") {
                return addPerson(firstName, lastName);
            }
        }

        if (_action === "delete") {
            console.log("NUKE");

            if (typeof personID === "string") {
                return deletePerson(personID);
            }
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

export default function PendingUI() {
    let people = useLoaderData();
    let transition = useTransition();

    let isCreateSubmission =
        transition.state === "submitting" &&
        transition.submission.formData.get("_action") === "create";
    let isDeleteSubmission =
        transition.state === "submitting" &&
        transition.submission.formData.get("_action") === "delete";

    return (
        <main>
            <Link to="/">Back 🏠</Link>
            <article className="stack">
                <h2>Pending UI</h2>
                <p>
                    We are now loading data from our database, and we're also
                    able to support some CRUD operations, mainly create and
                    delete. For now this is enough of backend logic, instead we
                    will now focus on using the state from the server to make a
                    better UI experience.
                </p>
                <p>
                    We are goint to use the <code>useTransition()</code> hook
                    which returns to us an object that holds that holds all the
                    information we need about a page transition. A page
                    transition being what happens between a fetch call from our
                    route and a revalidation page load.
                </p>
                <p>
                    Things we can implement with the help of{" "}
                    <code>useTransition</code> include:
                </p>
                <ul>
                    <li>Global loading spinners</li>
                    <li>Spinners on clicked links</li>
                    <li>Disabling forms while a mutation is happening</li>
                    <li>
                        Optimistically showing a new record while it's being
                        created on the server
                    </li>
                    <li>
                        Optimistcally showing the state of a record while it's
                        being updated
                    </li>
                </ul>

                <p>
                    We can access the state of a transition through{" "}
                    <code>transition.state</code> which can only ever be{" "}
                    <strong>idle</strong>, <strong>submitting</strong> or{" "}
                    <strong>loading</strong>.
                </p>
                <p>
                    If we want to access the <code>formData</code> from the
                    reqest in our <strong>client</strong> we can access it
                    through <code>transmission.submission</code>. This mainly
                    helps us to build out optimistic UI which we will look at
                    later. But in this example it actually helps us to branch of
                    our logic depending on which form is being submitted, a
                    "create" submission or a "delete" submission, allowing us to
                    create UI logic specific to the action we're performing.
                    Check out the helpers we built in the function component up
                    top ans see the code to see how we conditionally render
                    based off these booleans.
                </p>
                <p>
                    Why don't you play with our little app and look at how the
                    transition value changes:
                </p>

                <h4>Transmission state: {transition.state}</h4>
                <h4>Create action state: {isCreateSubmission ? "🟡" : "🟢"}</h4>
                <h4>Delete action state: {isDeleteSubmission ? "🟡" : "🟢"}</h4>
                <div className="box rounded-md">
                    <article className="stack">
                        {people.length ? (
                            <ul className="stack">
                                {people.map((person: any) => (
                                    <li key={person.rowid}>
                                        {person.firstName} {person.lastName}{" "}
                                        <Form className="inline" method="post">
                                            <input
                                                type="hidden"
                                                name="personID"
                                                value={person.rowid}
                                            />
                                            <button
                                                className="bg-transparent"
                                                type="submit"
                                                name="_action"
                                                value="delete"
                                                disabled={isDeleteSubmission}
                                                aria-label="delete"
                                            >
                                                {isDeleteSubmission
                                                    ? "🧨"
                                                    : "❌"}
                                            </button>
                                        </Form>
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
                            <button
                                type="submit"
                                name="_action"
                                value="create"
                                disabled={isCreateSubmission}
                            >
                                {isCreateSubmission ? "🕐" : "➕"}
                            </button>
                        </Form>
                    </article>
                </div>
            </article>
        </main>
    );
}
