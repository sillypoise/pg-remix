import { useLocation } from "@remix-run/react";

export default function Index() {
    let {
        child,
        file,
        parent,
        location,
    }: {
        child: string;
        file: string;
        parent: string;
        location: string;
    } = {
        child: "default child",
        parent: "root.tsx",
        file: "@routes/index.tsx",
        location: useLocation().pathname,
    };

    return (
        <article className="center stack mbs-2xl | debug">
            <h2>{file}</h2>
            <p>
                I am the <strong>{child}</strong> of <code>{parent}</code>{" "}
                located at <code>{location}</code>
            </p>
        </article>
    );
}
