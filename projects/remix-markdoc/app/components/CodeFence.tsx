import { useEffect, useRef } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";

Prism.languages.markdoc = {
    tag: {
        pattern: /{%(.|\n)*?%}/i,
        inside: {
            tagType: {
                pattern: /^({%\s*\/?)(\w*|-)*\b/i,
                lookbehind: true,
            },
            id: /#(\w|-)*\b/,
            string: /".*?"/,
            equals: /=/,
            number: /\b\d+\b/i,
            variable: {
                pattern: /\$[\w.]+/i,
                inside: {
                    punctuation: /\./i,
                },
            },
            function: /\b\w+(?=\()/,
            punctuation: /({%|\/?%})/i,
            boolean: /false|true/,
        },
    },
    variable: {
        pattern: /\$\w+/i,
    },
    function: {
        pattern: /\b\w+(?=\()/i,
    },
};

function CodeFence({
    children,
    "data-language": language,
    process,
}: {
    children: React.ReactNode;
    "data-language": string;
    process: boolean;
}) {
    let ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            Prism.highlightElement(ref.current, false);
        }
    }, [children]);

    let lang = language === "md" ? "markdoc" : language || "markdoc";

    let lines =
        typeof children === "string"
            ? children.split("\n").filter(Boolean)
            : [];

    return (
        <pre key={children as string} ref={ref} className={`language-${lang}`}>
            {children}
        </pre>
    );
}

export { CodeFence };
