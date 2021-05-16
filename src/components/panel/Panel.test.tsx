import { render } from "@testing-library/react";
import Panel from "./Panel";

test("Panel render", () => {
    render(
        <Panel
            className="css-class"
            grow={1}
            style={{ backgroundColor: "blue" }}
        >
            <div>Content</div>
        </Panel>
    );
});
