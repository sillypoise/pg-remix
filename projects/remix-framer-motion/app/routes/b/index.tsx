import { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";

export async function action({ request }: ActionArgs) {
    let form = await request.formData();
    let checkbox = form.get("test");
    let text = form.get("text");
    return { checkbox };
}

export default function PageB() {
    // let [actionData] = useState(useActionData());
    // console.log(actionData);

    return (
        <Form method="post">
            <input type="text" name="text" id="text" />
            <input type="checkbox" name="test" id="test" />
            <button type="submit">Enter</button>
        </Form>
    );
}
