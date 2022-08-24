import type { ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";

export let action: ActionFunction = async ({ request }) => {
    let formData = await request.formData();
    let email = formData.get("email");

    // Examle request to convertkit API
    // const API_KEY = process.env["CONVERTkIT_kEY"];
    // const FORM_ID = "123";
    // const API = "https://api.convertkit.com/v3";

    // let res = await fetch(`${API}/forms/${FORM_ID}/subscribe`, {
    //     method: "post",
    //     body: JSON.stringify({
    //         email, api_key: API_KEY
    //     }),
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8"
    //     }
    // })

    // return res.json()

    let fakeDataSuccess = {
        name: "Joe",
        email,
        subscribed: true,
    };

    let fakeDataError = {
        error: "Empty input",
        message: "Please enter at least some text 🙄",
    };

    if (email) {
        return fakeDataSuccess;
    } else {
        return fakeDataError;
    }
};

export default function Newsletter() {
    let actionData = useActionData();
    let transition = useTransition();
    // We are deriving state from our server to render appropriate UI
    let state: "success" | "error" | "idle" | "submitting" =
        transition.submission
            ? "submitting"
            : actionData?.subscribed
            ? "success"
            : actionData?.error
            ? "error"
            : "idle";

    let inputRef = useRef<HTMLInputElement>(null);
    let successRef = useRef<HTMLHeadingElement>(null);
    let isMounted = useRef<boolean>(false);

    useEffect(() => {
        if (state === "error") {
            inputRef.current?.focus();
        }

        if (state === "idle" && isMounted.current) {
            inputRef.current?.select();
        }

        if (state === "success") {
            successRef.current?.focus();
        }

        isMounted.current = true;
    }, [state]);

    return (
        <main>
            <article className="stack">
                <h2>Newsletter example</h2>
                <Link to="/">Back 🏠</Link>
                <p>
                    This exercise is based off{" "}
                    <a
                        href="https://www.youtube.com/watch?v=jd_bin5HPrw&list=PLXoynULbYuEDG2wBFSZ66b85EIspy3fy6"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        this lesson
                    </a>
                </p>
                <p>
                    In this page we make use of an <code>action</code> function
                    to handle <code>POST</code> request to this same route.
                </p>
                <p>
                    Send a request, i.e. enter an email, and see the data that
                    is being sent back to us:
                </p>
                <pre>
                    <code>{JSON.stringify(actionData)}</code>
                </pre>
                <div className="box rounded-md bg-neutral-100">
                    <Form replace method="post" hidden={state === "success"}>
                        <div className="stack">
                            <h3>Subscribe!</h3>
                            <p>Don't miss any updates!</p>
                            <fieldset
                                className="stack"
                                disabled={state === "submitting"}
                            >
                                <input
                                    aria-label="Email address"
                                    ref={inputRef}
                                    type="email"
                                    name="email"
                                    id="newsletter"
                                />
                                <button type="submit">
                                    {state === "submitting"
                                        ? "Subscribing..."
                                        : "Subscribe"}
                                </button>
                            </fieldset>
                            <p>
                                {state === "error" ? (
                                    actionData.message
                                ) : (
                                    <>&nbsp;</>
                                )}
                            </p>
                        </div>
                    </Form>
                    <article hidden={state !== "success"}>
                        <div className="stack">
                            <h2 ref={successRef} tabIndex={-1}>
                                You're subscribed 🥳
                            </h2>
                            <p className="text-00">
                                Please check your email to confirm your
                                subscription
                            </p>
                            <p className="text-0">
                                <Link to=".">Start Over</Link>
                            </p>
                        </div>
                    </article>
                </div>
                <p>
                    We create a <code>Form</code> component and export an{" "}
                    <code>action</code> function. In that <code>action</code> we
                    have access to our form data through the{" "}
                    <code>request</code> object, i.e.{" "}
                    <code>request.formData()</code>. The form data is serialized
                    and brought server side automagically! No need for React
                    state to pass input values to our server,{" "}
                    <strong>neato</strong>!
                </p>
                <p>
                    Now inside our <code>action</code> function, i.e. our server
                    code, we can do whatever API calls we need to do with the
                    incoming data. First of all we should always validate our
                    user's input of course. After that we can do whatever logic
                    we need!
                </p>
                <p>
                    To make any HTTP requests we can use the built-in{" "}
                    <code>fetch</code> function or any other method you'd like
                </p>
                <ul>
                    <li>Add to a database? ✅</li>
                    <li>Forward email data to convertkit API? ✅</li>
                    <li>Send event to Apache Kafka? ✅</li>
                </ul>
                <p>
                    We can also bring into our client-side app data from our
                    server by using the <code>useActionData()</code> hook. This
                    specifically gives us access to whatever we are returning
                    from our <code>action</code> function.
                </p>
                <p>
                    Depending on what our API call does in our server we can
                    send different data to our client an then render conditional
                    UI based off that. The main example being error handling.
                    Try submitting without any text to see how the message
                    changes.
                </p>
                <p>
                    <strong>Notice</strong> we create a <code>state</code>{" "}
                    variable that will hold different values based off the
                    values we get from <code>actionData</code> i.e. our server
                    data!
                </p>
                <p>
                    The <code>big takeaway</code> in this page is to realize we
                    are deriving state from our server logic to render
                    appropriate UI in a declarative manner, which is where
                    React.js really shines
                </p>
                <p>
                    We're technically done. This works. However we can now make
                    use of the <code>useTransition()</code> hook which allows us
                    to hook into the server's state in various different ways,
                    allowing us to easily build <strong>pending UI</strong> and{" "}
                    <strong>optimistic UI</strong>. But that's for another page
                    to have a deep dive.
                </p>
            </article>
        </main>
    );
}
