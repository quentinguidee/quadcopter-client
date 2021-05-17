import { render } from "@testing-library/react";
import Layout from "./Layout";

it("should render an horizontal layout", () => {
    render(<Layout orientation="horizontal" />);
});

it("should render a vertical layout", () => {
    render(<Layout orientation="vertical" />);
});
