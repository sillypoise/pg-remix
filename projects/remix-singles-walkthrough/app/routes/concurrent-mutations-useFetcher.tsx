import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import {
    Form,
    Link,
    useFetcher,
    useLoaderData,
    useTransition,
} from "@remix-run/react";
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

export default function ConcurrentMutations() {
    let people = useLoaderData();
    let transition = useTransition();

    let formRef = useRef<HTMLFormElement>(null);
    let firstNameRef = useRef<HTMLInputElement>(null);

    let isCreateSubmission =
        transition.state === "submitting" &&
        transition.submission.formData.get("_action") === "create";

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
                <h2>
                    Concurrent Mutations with <code>useFetcher</code>
                </h2>
                <p>
                    Up until now all our <code>Form</code> submissions perform a
                    navigation change on submission. Granted this is client-side
                    navigation, Remix just emulates what the default browser
                    behaviour woudl be.
                </p>
                <p>
                    But in some apps we don't necessarily want to create a
                    navigation for <strong>every</strong> action/mutation our
                    users perform. The solution to this is to perform something
                    we call <strong>concurrent mutations</strong> and we do so
                    through the <code>useFetcher</code> hook from Remix.
                </p>
                <p>
                    <code>useFetcher()</code> basically allows us to call a{" "}
                    <code>loader</code> or <code>action</code> without
                    performing a URL navigation, which is the default behaviour.
                    In this page we are using it for our{" "}
                    <code>{`<PersonList/>`}</code> component. Specifically to
                    handle multiple concurrent "delete" submissions, thus
                    allowing for multiple list items to be in a pending state.
                    Which is not the default behaviour.
                </p>
                <p>
                    <code>useFetch()</code> is also useful when we need to:
                </p>
                <ul>
                    <li>
                        fetch data <strong>not</strong> associated with UI
                        routes (popovers, dynamic forms, etc)
                    </li>
                    <li>
                        submit data to actions{" "}
                        <strong>without navigating</strong>, e.g. shared
                        components like newsletter signups
                    </li>
                    <li>
                        handle multiple concurrent submissions in a list
                        (typical "todo app" list where you can click multiple
                        buttons and all be pending at the same time)
                    </li>
                    <li>infinite scroll containers</li>
                    <li>etc...</li>
                </ul>
                <div className="box rounded-md">
                    <article className="stack">
                        {people.length ? (
                            <ul className="stack">
                                {people.map((person: any) => (
                                    //* Main code to learn from is down below! ↓↓↓
                                    <PersonItem
                                        person={person}
                                        key={person.rowid}
                                    />
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

function PersonItem({ person, key }: any) {
    let fetcher = useFetcher();

    let isDeleteSubmission =
        fetcher.state === "submitting" &&
        fetcher.submission.formData.get("_action") === "delete";
    return (
        <li key={person.rowid}>
            {person.firstName} {person.lastName}
            {/* //* Notice we went from <Form /> to <fetcher.Form /> */}
            <fetcher.Form className="inline" method="post">
                <input type="hidden" name="personID" value={person.rowid} />
                <button
                    className="bg-transparent"
                    type="submit"
                    name="_action"
                    value="delete"
                    disabled={isDeleteSubmission}
                    aria-label="delete"
                >
                    {isDeleteSubmission ? "🧨" : "❌"}
                </button>
            </fetcher.Form>
        </li>
    );
}
