import { type LoaderArgs, type ActionArgs, json } from "@remix-run/node";
import {
    type FetcherWithComponents,
    Form,
    useActionData,
    useFetcher,
    useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";

export function action({ request }: ActionArgs) {
    console.log("🟢 ACTION");
    return json({ hello: "Mario" });
}

export function loader({ request }: LoaderArgs) {
    return { hello: "Peach" };
}

export default function Index() {
    const data = useActionData<typeof action>();
    const fetcher = useFetcher();
    const fetcherData = fetcher.data;
    console.log(data);
    console.log(fetcher);
    return (
        <article className="center mlb-xl stack">
            <h1 className="text-3">Remix Fetching Patterns</h1>
            <p>Learning client-side fetching patterns inside remix</p>
            <h2 className="text-2">Returned data:</h2>
            <div className="cluster">
                <p>
                    data returned from navigation, i.e. Form or submit
                    (useSubmit) →
                </p>
                <div>
                    {JSON.stringify(data ? data : { bye: "Yoshi" }, null, 4)}
                </div>
                <p>
                    data returned from fetcher hook, i.e. fetcher.Form or
                    fetcher.submit →
                </p>
                <div>
                    {JSON.stringify(
                        fetcherData ? fetcherData : { bye: "Yoshi" },
                        null,
                        4
                    )}
                </div>
            </div>
            <article
                className="stack debug-r"
                data-layout="2/2"
                data-rows="masonry"
            >
                <h4 className="text-1">Form</h4>
                <WithForm />
                <h4 className="text-1">fetcher.Form</h4>
                <p className="text-0">
                    we have to pass down the fetcher function to our abstracted
                    form though
                </p>
                <WithFetcherForm fetcher={fetcher} />
                <h4 className="text-1">useSubmit</h4>
                <WithUseSubmit />
                <h4 className="text-1">fetcher.submit</h4>
                <p className="text-0">
                    we have to pass down the fetcher function to our abstracted
                    form though
                </p>
                <WithFetcherSubmit fetcher={fetcher} />
            </article>
        </article>
    );
}

function WithForm() {
    return (
        <Form method="post">
            <label>Search </label>
            <input name="term" type="text" />
            <button type="submit">Search</button>
        </Form>
    );
}

function WithFetcherForm({ fetcher }: { fetcher: FetcherWithComponents<any> }) {
    return (
        <fetcher.Form method="post">
            <label>Search </label>
            <input name="term" type="text" />
            <button type="submit">Search</button>
        </fetcher.Form>
    );
}

function WithUseSubmit() {
    const submit = useSubmit();

    //! Imperative submissions ΓåôΓåôΓåô
    function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("programatically submitting a form");
        submit(null, { method: "post" });
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("imperative submission after 5 seconds");
            submit(null, { method: "post" });
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Form method="post" onSubmit={handleSubmission}>
            <label>Search </label>
            <input name="term" type="text" />
            <button type="submit">Search</button>
        </Form>
    );
}

function WithFetcherSubmit({
    fetcher,
}: {
    fetcher: FetcherWithComponents<any>;
}) {
    //! Imperative submissions ↓↓↓
    function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("programatically submitting a form");
        fetcher.submit(null, { method: "post" });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(
                "imperative fetcher (non-nav) submission after 5 seconds"
            );
            fetcher.submit(null, { method: "post" });
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Form method="post" onSubmit={handleSubmission}>
            <label>Search </label>
            <input name="term" type="text" />
            <button type="submit">Search</button>
        </Form>
    );
}
