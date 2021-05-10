import React from "react";
import Button from "../../components/button/Button";
import Panel from "../../components/panel/Panel";

import styles from "./sass/Dashboard.module.sass";

export default function ActionsPanel() {
    const on = () => {};
    const off = () => {};
    const liftoff = () => {};
    const landing = () => {};
    const emergencyStop = () => {};
    const connect = () => {};

    return (
        <Panel className={styles.actions}>
            <Button value="on" onClick={on} />
            <Button value="off" onClick={off} />
            <Button value="liftoff" onClick={liftoff} />
            <Button value="landing" onClick={landing} />
            <Button value="emergency stop" onClick={emergencyStop} />
            <Button value="connect" onClick={connect} />
        </Panel>
    );
}
