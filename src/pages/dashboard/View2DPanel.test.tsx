import { render } from "@testing-library/react";
import { IDrone } from "./Dashboard";
import View2DPanel from "./View2DPanel";

it("should render View2DPanel", () => {
    const drone: IDrone = {
        state: "unknown",
        accelerometer: "disconnected",
        position: { x: 0, y: 0, z: 0 },
        angle: { x: 0, y: 0, z: 0 },
        leds: {
            led1: "disconnected",
            led2: "disconnected",
            led3: "disconnected",
            led4: "disconnected",
        },
        motors: {
            motor1: { state: "disconnected", speed: undefined },
            motor2: { state: "disconnected", speed: undefined },
            motor3: { state: "disconnected", speed: undefined },
            motor4: { state: "disconnected", speed: undefined },
        },
    };

    render(<View2DPanel drone={drone} />);
});
