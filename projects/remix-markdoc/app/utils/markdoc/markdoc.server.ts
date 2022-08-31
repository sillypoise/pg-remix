import { parse, transform, type RenderableTreeNodes } from "@markdoc/markdoc";
import * as tags from "./tags";
// import { callout } from "./tags";

function processMarkdown(markdown: string): RenderableTreeNodes {
    console.dir(tags);
    // console.dir(callout);

    return transform(parse(markdown), { tags });
}

export { processMarkdown };
