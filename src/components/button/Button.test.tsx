import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

test("Button click", () => {
    const onClick = jest.fn();
    render(<Button value="Value" onClick={onClick} />);
    fireEvent.click(screen.getByText("VALUE"));
    expect(onClick).toBeCalledTimes(1);
});

test("Button disabled click", () => {
    const onClick = jest.fn();
    render(<Button value="Value" onClick={onClick} disabled />);
    fireEvent.click(screen.getByText("VALUE"));
    expect(onClick).toBeCalledTimes(0);
});
