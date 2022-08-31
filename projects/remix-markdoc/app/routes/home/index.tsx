import { useLoaderData } from "@remix-run/react";
import { Markdown } from "~/components/Markdown";
import { processMarkdown } from "~/utils/markdoc/markdoc.server";

let doc = `

# Hello World

We are rendering markdown server side thanks to Remix!

- It seems to
- work
- even with lists

This is a great authoring experience.

Let's continue to enhance this.

{% callout type="warning" title="Danger ahead" %}
Attention dwellers!
{% /callout %}

{% callout type="check" title="Pre-flight checks" %}
Make sure you have everything you need
{% /callout %}

Let's test links: [docs](https://markdoc.dev/docs/nodes)
`;

export function loader() {
    let content = processMarkdown(doc);

    return { content };
}

export default function Index() {
    let data = useLoaderData().content;

    return <Markdown content={data} />;
}
