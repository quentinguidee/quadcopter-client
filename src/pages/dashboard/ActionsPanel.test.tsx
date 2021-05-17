import { render } from "@testing-library/react";
import ActionsPanel from "./ActionsPanel";

it("should render ActionsPanel", () => {
    render(<ActionsPanel state="disconnected" />);
});
