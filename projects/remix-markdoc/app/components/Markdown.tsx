import { renderers, type RenderableTreeNodes } from "@markdoc/markdoc";
import * as React from "react";

import * as components from "~/utils/markdoc/components";

interface Props {
    content: RenderableTreeNodes;
}

function Markdown({ content }: Props) {
    return (
        <React.Fragment>
            {renderers.react(content, React, {
                components,
            })}
        </React.Fragment>
    );
}

export { Markdown };
