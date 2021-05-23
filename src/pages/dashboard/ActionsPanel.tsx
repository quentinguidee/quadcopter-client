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
    const liftoff = async () => await server.post("/drone/liftoff");
    const landing = async () => await server.post("/drone/landing");

    const startMotorsTest = async () => {
        await server.post("/drone/motorstest/on");
    };

    const stopMotorsTest = async () => {
        await server.post("/drone/motorstest/off");
    };

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
                value="start test motors"
                onClick={startMotorsTest}
                disabled={state !== "on"}
            />
            <Button
                value="stop motors test"
                onClick={stopMotorsTest}
                disabled={state !== "motorstest"}
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
