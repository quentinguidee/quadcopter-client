import React, { Dispatch, SetStateAction } from "react";
import Button from "../../components/button/Button";
import Panel from "../../components/panel/Panel";
import { server } from "../../server";
import { State } from "./Dashboard";

import styles from "./sass/Dashboard.module.sass";

type ActionsPanelProps = {
    state: State;
};

export default function ActionsPanel(props: ActionsPanelProps) {
    const { state } = props;

    const on = async () => await server.post("/drone/on");
    const off = async () => await server.post("/drone/off");
    const liftoff = () => {};
    const landing = () => {};
    const emergencyStop = () => {};
    const connect = async () => await server.post("/drone/connect");

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
