import * as React from "react";

function StyledSpan({
    children,
    className,
}: {
    className: string;
    children: React.ReactNode;
}) {
    return (
        <span style={{ textDecoration: "underline" }} className={className}>
            {children}
        </span>
    );
}

export { StyledSpan };
