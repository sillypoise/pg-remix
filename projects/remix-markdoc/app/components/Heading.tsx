import * as React from "react";

function Heading({
    level,
    children,
}: {
    level: number;
    children: React.ReactNode;
}) {
    return React.createElement(
        `h${level}`,
        { style: { textDecoration: "underline" } },
        children
    );
}

export { Heading };
