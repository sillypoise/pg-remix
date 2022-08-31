export function loader() {
    return {
        data: {
            hello: "world",
        },
    };
}

export default function Test() {
    return (
        <main>
            <article>
                Just a test to see if links are using the proper{" "}
                <code>Link</code> component for client-side links.
            </article>
        </main>
    );
}
