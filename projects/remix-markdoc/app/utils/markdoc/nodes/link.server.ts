import { Tag, type Schema } from "@markdoc/markdoc";

function parsePrefetch(attributes: any) {
    let prefetch = {
        NONE: "none",
        INTENT: "intent",
        RENDER: "render",
    };

    if (!attributes.title) return prefetch.NONE;

    let title = attributes.title.trim();

    if (!title || !title.includes(":") || title === ":") {
        return prefetch.NONE;
    }

    let text = title.split(":")[1].trim();
    if (text === "intent") return prefetch.INTENT;
    if (text === "render") return prefetch.RENDER;

    return prefetch.NONE;
}

function hasReloadDocument(attributes: any) {
    if (!attributes.title) return false;
    return attributes.title.includes("~");
}

const link: Schema = {
    render: "LinkWrapper",
    children: ["strong", "em", "s", "code", "text", "tag"],
    attributes: {
        href: { type: Number, required: true, default: "/" },
        title: { type: String },
        reloadDocument: { type: Boolean, required: false, default: false },
    },
    transform(node, config) {
        let attributes = node.transformAttributes(config);
        let children = node.transformChildren(config);

        let to = attributes.href;
        let prefetch = parsePrefetch(attributes);
        let reloadDocument = hasReloadDocument(attributes);

        return new Tag(
            "LinkWrapper",
            { ...attributes, to, prefetch, reloadDocument },
            children
        );
    },
};

export { link };
