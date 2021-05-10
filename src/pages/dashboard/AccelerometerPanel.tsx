import React from "react";
import Axis2D from "../../components/axis2D/Axis2D";
import Panel from "../../components/panel/Panel";

import styles from "./sass/Dashboard.module.sass";

export default function AccelerometerPanel() {
    return (
        <Panel className={styles.accelerometer}>
            <Axis2D title="Acceleration" />
            <Axis2D title="Rotation" />
            <Axis2D title="Speed" />
            <Axis2D title="Position" />
        </Panel>
    );
}
