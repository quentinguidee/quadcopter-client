import { render } from "@testing-library/react";
import Axis1D from "./Axis1D";

test("Render Axis1D", () => {
    render(<Axis1D name="Axis 1D" value={30} min={10} max={60} />);
});

test("Render Axis1D without value", () => {
    render(<Axis1D name="Axis 1D" min={10} max={60} />);
});
