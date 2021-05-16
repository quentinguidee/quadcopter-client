import { render } from "@testing-library/react";
import ActionsPanel from "./ActionsPanel";

test("Render ActionsPanel", () => {
    render(<ActionsPanel state="disconnected" />);
});
