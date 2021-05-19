import { render } from "@testing-library/react";
import Timeline from "./Timeline";

it("should render Timeline", () => {
    render(
        <Timeline
            rangeInSeconds={30}
            currentTime={{
                minus: true,
                minutes: 0,
                seconds: 12,
            }}
            elements={[]}
        />
    );
});
