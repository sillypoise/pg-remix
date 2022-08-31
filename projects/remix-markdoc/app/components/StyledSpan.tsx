import * as React from "react";

function StyledSpan({ children }: { children: React.ReactNode }) {
    return <span style={{ color: "pink" }}>{children}</span>;
}

export { StyledSpan };
