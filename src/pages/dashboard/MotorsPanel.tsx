import React from "react";
import Axis1D from "../../components/axis1D/Axis1D";
import Panel from "../../components/panel/Panel";

import styles from "./sass/Dashboard.module.sass";

export default function MotorsPanel() {
    const MIN = 0;
    const MAX = 180;

    const axisProps = {
        min: MIN,
        max: MAX,
    };

    return (
        <Panel className={styles.motors}>
            <Axis1D name="A" value={20} {...axisProps} />
            <Axis1D name="B" value={100} {...axisProps} />
            <Axis1D name="C" value={100} {...axisProps} />
            <Axis1D name="D" value={100} {...axisProps} />
        </Panel>
    );
}
