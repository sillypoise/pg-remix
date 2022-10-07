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
        child: "a child",
        parent: "parent-a.tsx",
        file: "@routes/parent-a/child-a.tsx",
        location: useLocation().pathname,
    };

    return (
        <article className="center stack mbs-2xl | debug">
            <h3>{file}</h3>
            <p>
                I am <strong>{child}</strong> of <code>{parent}</code> located
                at <code>{location}</code>
            </p>
        </article>
    );
}
