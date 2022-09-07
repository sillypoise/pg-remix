import { useLoaderData } from "@remix-run/react";
import { Markdown } from "~/components/Markdown";
import { processMarkdown } from "~/utils/markdoc/markdoc.server";

const doc = `
# Custom document node!

Useful for styling or customizing the overall wrapper of our markdoc render.

We create a custom Document
`;

export function loader() {
    let content = processMarkdown(doc);

    return { content };
}

export default function Index() {
    let data = useLoaderData().content;
    // console.dir(data);
    return <Markdown content={data} />;
}
