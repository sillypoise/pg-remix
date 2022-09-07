import React from "react";

function Document({ children, ...props }: { children: React.ReactNode }) {
    return <article className="debug">{children}</article>;
}

export { Document };
