import { type Schema } from "@markdoc/markdoc";

const styledSpan: Schema = {
    render: "StyledSpan",
    // description: "Display the enclosed content in a callout box",
    children: ["strong", "s", "link", "code", "text", "tag"],
    attributes: {},
};

export { styledSpan };
