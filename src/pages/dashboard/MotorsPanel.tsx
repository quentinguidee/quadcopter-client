import React from "react";
import Axis1D from "../../components/axis1D/Axis1D";
import Panel from "../../components/panel/Panel";
import { Motors } from "./Dashboard";

import styles from "./sass/Dashboard.module.sass";

type MotorsPanelProps = {
    motors: Motors;
};

export default function MotorsPanel(props: MotorsPanelProps) {
    const { motor1, motor2, motor3, motor4 } = props.motors;

    const MIN = 0;
    const MAX = 180;

    const axisProps = {
        min: MIN,
        max: MAX,
    };

    return (
        <Panel className={styles.motors}>
            <Axis1D name="A" value={motor1.speed} {...axisProps} />
            <Axis1D name="B" value={motor2.speed} {...axisProps} />
            <Axis1D name="C" value={motor3.speed} {...axisProps} />
            <Axis1D name="D" value={motor4.speed} {...axisProps} />
        </Panel>
    );
}
