import { useLoaderData } from "@remix-run/react";
import { Markdown } from "~/components/Markdown";
import { processMarkdown } from "~/utils/markdoc/markdoc.server";

import code from "~/styles/code.css";
import nord from "~/styles/prismjs/nord.css";

let doc = `
# Hello Markdoc

This is a page testing how to render code fences.

Wooo!

${`\`\`\`tsx
let hello = "world";

function CodeFence({ children }: { children: React.ReactNode }) {
    return (
        <pre key={children as string} className={\`language-$\{lang}\`} />
            {children}
        </pre> 
    )
}
\`\`\`
`}

Okay that looks great! (hopefully) what about inline code?

I am a classice \`hello world\` tutorial. I use \`foo\` and \`bar\` to explain concepts!
`;

export function links() {
    return [
        {
            rel: "stylesheet",
            href: code,
        },
        {
            rel: "stylesheet",
            href: nord,
        },
    ];
}

export function loader() {
    let content = processMarkdown(doc);

    return { content };
}

export default function Index() {
    let data = useLoaderData().content;
    // console.dir(data);
    return <Markdown content={data} />;
}
