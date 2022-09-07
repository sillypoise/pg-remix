import { nodes, type Schema, Tag } from "@markdoc/markdoc";
// import { Document } from '../components';

let document: Schema = {
    render: "Document",
    children: nodes.document.children,
    attributes: nodes.document.attributes,
};

export { document };
