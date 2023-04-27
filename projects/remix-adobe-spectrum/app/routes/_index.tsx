import type { V2_MetaFunction } from "@remix-run/node";
import { Button, Text, ButtonGroup, ActionButton } from "@adobe/react-spectrum";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <main>
      <h1>Hello Adobe Spectrum</h1>
      <Button variant="primary">
        <Text>Hello World</Text>
      </Button>
    </main>
  );
}
