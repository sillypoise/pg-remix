import * as React from "react";

function Callout({
    title,
    type,
    children,
}: {
    title: string;
    type: string;
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                border: "solid",
                padding: "1rem",
                backgroundColor: `${
                    type === "caution" || type == "warning" ? "tomato" : "none"
                }`,
            }}
        >
            <span>
                {type === "caution"
                    ? "⚠️"
                    : type === "check"
                    ? "✅"
                    : type === "warning"
                    ? "💀"
                    : "📃"}
            </span>
            <strong>{title}</strong>
            <div style={{ marginInlineStart: "2rem" }}>
                <span>{children}</span>
            </div>
        </div>
    );
}

export { Callout };
