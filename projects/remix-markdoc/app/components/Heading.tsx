import * as React from "react";

function Heading({
    level,
    className,
    children,
}: {
    level: number;
    className: string;
    children: React.ReactNode;
}) {
    return React.createElement(
        `h${level}`,
        { className, style: { textDecoration: "underline" } },
        children
    );
}

export { Heading };
