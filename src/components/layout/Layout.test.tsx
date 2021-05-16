import { render } from "@testing-library/react";
import Layout from "./Layout";

test("Horizontal layout render", () => {
    render(<Layout orientation="horizontal" />);
});

test("Vertical layout render", () => {
    render(<Layout orientation="vertical" />);
});
