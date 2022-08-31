import { Tag, type Schema } from "@markdoc/markdoc";

const heading: Schema = {
    render: "Heading",
    children: ["inline"],
    attributes: {
        level: { type: Number, required: true, default: 1 },
    },
    transform(node, config) {
        let attributes = node.transformAttributes(config);
        let children = node.transformChildren(config);
        return new Tag("Heading", { ...attributes }, children);
    },
};

export { heading };
