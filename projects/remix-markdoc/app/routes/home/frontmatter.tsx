import { useLoaderData } from "@remix-run/react";
import { Markdown } from "~/components/Markdown";
import { processMarkdown } from "~/utils/markdoc/markdoc.server";

const doc = `---
title: Authoring in Markdoc
description: hello! 👋👋👋
date: 2022-04-01
---

# Hey you

Will this frontmatter value show itself? → {% $fm.description %}

`;

export function loader() {
    // All the frontmatter parsing an injecting happens in processMarkdown
    let content = processMarkdown(doc);

    return { content };
}

export default function Index() {
    let data = useLoaderData().content;
    console.dir(data);
    return <Markdown content={data} />;
}
