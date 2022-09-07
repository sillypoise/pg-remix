import { parse, transform, type RenderableTreeNodes } from "@markdoc/markdoc";
import yaml from "js-yaml";

import * as tags from "./tags";
import * as nodes from "./nodes";

function processMarkdown(markdown: string): RenderableTreeNodes {
    // console.dir(tags);
    // console.dir(callout);
    let ast = parse(markdown);
    // console.dir(ast);
    let frontmatter = ast.attributes.frontmatter
        ? yaml.load(ast.attributes.frontmatter)
        : {};
    let variables = { fm: frontmatter };

    return transform(ast, { tags, nodes, variables });
}

export { processMarkdown };
