import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

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

export default function ClearingInputsAfterSubmissions() {
    let people = useLoaderData();
    let transition = useTransition();

    let formRef = useRef<HTMLFormElement>(null);
    let firstNameRef = useRef<HTMLInputElement>(null);

    let isCreateSubmission =
        transition.state === "submitting" &&
        transition.submission.formData.get("_action") === "create";
    let isDeleteSubmission =
        transition.state === "submitting" &&
        transition.submission.formData.get("_action") === "delete";

    useEffect(() => {
        if (!isCreateSubmission) {
            formRef.current?.reset();
            firstNameRef.current?.focus();
        }
    }, [isCreateSubmission]);

    return (
        <main>
            <Link to="/">Back 🏠</Link>
            <article className="stack">
                <h2>Clearing inputs after submission</h2>
                <p>
                    Ok our app is going along great but notice that whenever we
                    add an item to our list the inputs do not clear, which
                    should be the default behaviour. Yuck. Let's fix that!
                </p>
                <p>
                    To do so we are going to use our good old React friends{" "}
                    <code>useRef()</code> for grabbing a DOM element across
                    renders and
                    <code>useEffect()</code> which is great at synchronizing
                    React with the DOM
                </p>
                <p>
                    We create two refs one for the whole form and one for the{" "}
                    <code>firstName</code> input. One will reset the form and
                    the other one will help us focus on the first input after a
                    mutation.
                </p>
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
                            ref={formRef}
                        >
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                ref={firstNameRef}
                            />
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
