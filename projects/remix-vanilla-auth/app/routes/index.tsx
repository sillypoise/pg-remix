import { Form } from "@remix-run/react";

export default function Index() {
    return (
        <main className="mlb-l">
            <article className="center stack">
                <h2>Auth remix.</h2>
                <h3>Sign Up!</h3>
                <Form action="" className="stack">
                    <label htmlFor="signup:email">Username:</label>
                    <input
                        type="email"
                        name="signup:email"
                        id="signup:email"
                        className="max-is-[20ch] rounded-md p-3xs"
                    />
                    <label htmlFor="signup:pw">Password</label>
                    <input
                        type="password"
                        name="signup:password"
                        id="signup:password"
                        className="max-is-[20ch] rounded-md p-3xs"
                    />
                    <button
                        type="submit"
                        className="max-is-[20ch] rounded-md bg-dark-gray-5 hover:bg-dark-gray-6"
                    >
                        Sign me up!
                    </button>
                </Form>
            </article>
        </main>
    );
}
