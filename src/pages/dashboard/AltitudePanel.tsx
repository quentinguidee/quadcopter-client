import React from "react";

import Axis1D from "../../components/axis1D/Axis1D";
import Panel from "../../components/panel/Panel";

import styles from "./sass/Dashboard.module.sass";

type AltitudePanelProps = {
    altitude?: number;
};

export default function AltitudePanel(props: AltitudePanelProps) {
    return (
        <Panel className={styles.altitude}>
            <Axis1D min={0} max={10} value={props.altitude} name="ALT." />
        </Panel>
    );
}
