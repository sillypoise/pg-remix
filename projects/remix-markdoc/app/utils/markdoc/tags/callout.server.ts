import { type Schema } from "@markdoc/markdoc";

const callout: Schema = {
    render: "Callout",
    // description: "Display the enclosed content in a callout box",
    children: ["paragraph", "tag", "list"],
    attributes: {
        title: {
            type: String,
            // description: "The title displayed at the top of the callout"
        },
        type: {
            type: String,
            default: "note",
            matches: ["caution", "check", "note", "warning"],
            // description: "Controls the color and icon of the callout"
        },
    },
};

export { callout };
