import { render } from "@testing-library/react";
import { Motors } from "./Dashboard";
import MotorsPanel from "./MotorsPanel";

it("should render MotorsPanel", () => {
    const motors: Motors = {
        motor1: { state: "disconnected", speed: undefined },
        motor2: { state: "disconnected", speed: undefined },
        motor3: { state: "disconnected", speed: undefined },
        motor4: { state: "disconnected", speed: undefined },
    };

    render(<MotorsPanel motors={motors} />);
});
