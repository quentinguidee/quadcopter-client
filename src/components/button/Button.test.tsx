import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

it("should react to the click on a button", () => {
    const onClick = jest.fn();
    render(<Button value="Value" onClick={onClick} />);
    fireEvent.click(screen.getByText("VALUE"));
    expect(onClick).toBeCalledTimes(1);
});

it("should not react to the click on a disabled button", () => {
    const onClick = jest.fn();
    render(<Button value="Value" onClick={onClick} disabled />);
    fireEvent.click(screen.getByText("VALUE"));
    expect(onClick).toBeCalledTimes(0);
});
