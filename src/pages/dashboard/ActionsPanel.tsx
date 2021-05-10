import React, { useState } from "react";
import Button from "../../components/button/Button";
import Panel from "../../components/panel/Panel";
import { server } from "../../server";

import styles from "./sass/Dashboard.module.sass";

type State = "disconnected" | "on" | "off";

export default function ActionsPanel() {
    const [state, setState] = useState<State>("disconnected");

    const on = async () => {
        const request = await server.post("/drone/on");
        if (request.status === 200) {
            setState("on");
        }
    };

    const off = async () => {
        const request = await server.post("/drone/off");
        if (request.status === 200) {
            setState("off");
        }
    };

    const liftoff = () => {};
    const landing = () => {};
    const emergencyStop = () => {};

    const connect = async () => {
        const request = await server.post("/drone/connect");
        if (request.status === 200) {
            setState("off");
        }
    };

    return (
        <Panel className={styles.actions}>
            <Button value="on" onClick={on} disabled={state !== "off"} />
            <Button value="off" onClick={off} disabled={state !== "on"} />
            <Button
                value="liftoff"
                onClick={liftoff}
                disabled={state !== "on"}
            />
            <Button
                value="landing"
                onClick={landing}
                disabled={state !== "on"}
            />
            <Button
                value="emergency stop"
                onClick={emergencyStop}
                disabled={state === "disconnected"}
            />
            <Button
                value="connect"
                onClick={connect}
                disabled={state !== "disconnected"}
            />
        </Panel>
    );
}
