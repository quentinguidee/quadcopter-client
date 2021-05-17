import { render } from "@testing-library/react";
import Axis1D from "./Axis1D";

it("should render Axis1D", () => {
    render(<Axis1D name="Axis 1D" value={30} min={10} max={60} />);
});

it("should render disabled Axis1D", () => {
    render(<Axis1D name="Axis 1D" min={10} max={60} />);
});
