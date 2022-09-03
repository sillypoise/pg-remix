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

## Render React components with tags!

{% callout type="warning" title="Danger ahead" %}
Attention dwellers!
{% /callout %}

{% callout type="check" title="Pre-flight checks" %}
Make sure you have everything you need
{% /callout %}

### Modify built-in nodes {% .test %}

We can modify all headers. {% .test %}

Or something more useful, like links!

Let's test links: [docs](https://markdoc.dev/docs/nodes "hello")

Let's test a kewl Remix link that takes us to the [test page](/test)

Let's test adding a prefetch option to the link. Also to the [test page](/test ":intent")

Let's add a \`reloadDocument\` to our fancy link. Test [this to force a \`POST\` request](/test ":intent") 

Also testing if {% styledSpan .test %}custom React components style's can be overridden with class annotations {% /styledSpan %}


## What about Katex?

Inilne katex?

You probably want to render Katex in a separate component. It's all server rendered anyways.

`;

let test = `
# Testing

[links](/test)

{% Heading level=1 %}Another Test {% /Heading %}

{% callout type="warning" title="Danger ahead" %}
Attention dwellers!
{% /callout %}




`;

export function loader() {
    let content = processMarkdown(doc);

    return { content };
}

export default function Index() {
    let data = useLoaderData().content;
    console.dir(data);
    return <Markdown content={data} />;
}
