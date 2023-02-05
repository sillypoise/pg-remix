import { json, type ActionArgs } from "@remix-run/node";
import { Form, Link, useSubmit } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TagPicker } from "rsuite";
import styles from "rsuite/dist/rsuite.min.css";

export async function action({ request }: ActionArgs) {
    let data = await request.formData();
    let tags = data.get("tags");
    let obj = Object.fromEntries(data.entries());

    console.log(obj);

    return json("hi");
}

export function links() {
    return [
        {
            href: styles,
            rel: "stylesheet",
        },
    ];
}

const data = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
].map((item) => ({
    label: item,
    value: item,
}));

export default function Test() {
    const [tags, setTags] = useState<Array<string>>([]);
    const tagsRef = useRef(null);
    const submit = useSubmit();

    function handleChange(list: any) {
        setTags(list);
        let formData = new FormData();
        let jsonData = JSON.stringify({ list });
        formData.append("tags", list);
        // submit(formData, { method: "post" });
        // submit({ tags: list }, { method: "post" });
        submit({ tags: ["testing"] }, { method: "post" });
    }
    function handleSubmission(e: any) {
        e.preventDefault();
        // let formData = new FormData();
        // if (typeof tags === "string") {
        // formData.append("tags", tags);
        // }
        // submit(formData, { method: "post" });
        submit({ tags }, { method: "post" });
    }

    return (
        <article className="center mlb-l center stack">
            <h1 className="text-2">Welcome weary traveler!</h1>
            <Link to="/">Back</Link>
            <p>what you sellin?</p>
            <TagPicker
                ref={tagsRef}
                data={data}
                block
                onChange={handleChange}
            />
            <Form onSubmit={handleSubmission} method="post">
                <button type="submit">Send</button>
            </Form>
        </article>
    );
}
