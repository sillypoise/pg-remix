import { ActionArgs } from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";

export async function loader() {
    let data = await fetch(
        "https://jsonplaceholder.typicode.com/users?id=3"
    ).then((res) => res.json());

    return { data };
}

export default function PageB() {
    let [data] = useState(useLoaderData());

    return (
        <article className="center stack max-is-[50ch] cover">
            <h2 className="text-3">B</h2>
            <p>{JSON.stringify(data, null, 4)}</p>
            <Outlet />
        </article>
    );
}
