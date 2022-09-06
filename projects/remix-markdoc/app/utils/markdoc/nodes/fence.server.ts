import { nodes, type Schema } from "@markdoc/markdoc";
// import { CodeFence } from '../components';

let fence: Schema = {
    render: "CodeFence",
    attributes: nodes.fence.attributes,
};

export { fence };
