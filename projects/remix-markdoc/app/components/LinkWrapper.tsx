import { Link, type LinkProps } from "@remix-run/react";
import React from "react";

function LinkWrapper({
    children,
    to,
    href,
    title,
    prefetch,
    target,
    ...props
}: LinkProps & { href: string; title: string }) {
    let rgx = /https?:\/\//g;
    if (typeof to === "string" && to.match(rgx)) {
        return (
            <a
                href={to}
                title={title}
                target={target}
                rel={target === "_blank" ? "noreferrer" : undefined}
                className={props.className}
            >
                {children}
            </a>
        );
    }
    return (
        <Link to={to} prefetch={prefetch}>
            {children}
        </Link>
    );
}

export { LinkWrapper };
