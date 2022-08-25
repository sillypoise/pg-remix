import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

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

export default function SingleButtonMutation() {
    let people = useLoaderData();

    return (
        <main>
            <Link to="/">Back 🏠</Link>
            <article className="stack">
                <h2>Multiple Forms and Single Button Mutations</h2>
                <p>
                    Remember when we said that <code>Form</code> is just a
                    declarative way to perform a <code>POST</code> request? Well
                    what if I told you any <code>submit</code> action in HTML is
                    also essentially a <code>POST</code> request. That is, we
                    can perform mutations without user inputs. The best example
                    for this is a <code>button</code> element with a{" "}
                    <code>submit</code> type.
                </p>
                <p>
                    In this we use create a <code>Form</code> with a{" "}
                    <code>button</code> to allow users to perform a mutation
                    that deletes a user form our database in the list. Let's
                    implement it and see how it works in the code.
                </p>
                <p>
                    You will also notice that we are now running{" "}
                    <strong>two</strong> requests in this page and they are
                    directed, by Remix's default design, to the same API route,
                    this page, i.e. <code>/single-button-mutations</code>. So a
                    common question is how does our handler, i.e. our{" "}
                    <code>action</code> function, know what to do with two
                    possible fetching scenarios?
                </p>
                <p>
                    The answer to that lies in HTML. We can give our{" "}
                    <code>button</code> element a <code>name</code> and{" "}
                    <code>value</code> attribute, which together form a
                    key:value pair which show up in our <code>formData</code>{" "}
                    and helps us writ conditional logic in our server. Compare
                    the attributes and both buttons in these page to see this
                    clearly in our code. In this code base we give our buttons a{" "}
                    <code>name</code> of <code>_action</code>
                    and a value of either "create" or "delete". We use the
                    underscore in <code>_action</code>
                    because of HTML things, but the point is these values are
                    arbitrary, choose a pattern that works best for you.
                </p>
                <p>
                    Now that we have a way to distinguish these button acitions,
                    it's just a matter of writing conditional logic in our
                    single <code>action</code>, i.e. handler, to perform the
                    corresponding CRUD operation. In this case one is to
                    "create" a list item and the other one is to "delete" a list
                    item. Check out the code in the <code>action</code> function
                    in this route.
                </p>
                <p>
                    Notice something peculiar about our "delete"{" "}
                    <code>Form</code>. We need to be able to pass an{" "}
                    <code>id</code> to our database statement so it can delete
                    the appropriate record. How do we do that without controlled
                    inputs? Well we create a <code>hidden</code> input in our{" "}
                    <code>Form</code>! That way we can simply populate that with
                    the value we want, which in this case is{" "}
                    <code>{`person.rowid`}</code> in the <code>value</code>{" "}
                    attribute and we also give this input a <code>name</code>{" "}
                    thus allowing us to access this information in our{" "}
                    <code>action</code> function through the{" "}
                    <code>formData</code> API and finally allowing it to pass it
                    to our Database CRUDstatement.
                </p>
                <p>
                    Now try and delete users. Notice that{" "}
                    <strong>data revalidation</strong> is still happening so we
                    get immediate updates!
                </p>
                <p>
                    We are performing mutations without any need of client-side
                    state! Instead React only takes care of conditional UI
                    rendering! Sweet!
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
                                                aria-label="delete"
                                            >
                                                ❌
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
                            <button type="submit" name="_action" value="create">
                                ➕
                            </button>
                        </Form>
                    </article>
                </div>
            </article>
        </main>
    );
}
