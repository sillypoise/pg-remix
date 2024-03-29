import { Link, type LinkProps } from "@remix-run/react";

function LinkWrapper({
    children,
    to,
    href,
    title,
    prefetch,
    reloadDocument,
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
        <Link to={to} prefetch={prefetch} reloadDocument={reloadDocument}>
            {children}
        </Link>
    );
}

export { LinkWrapper };
