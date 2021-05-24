import React from "react";
import Panel from "../../components/panel/Panel";
import { IDrone } from "./Dashboard";

import styles from "./sass/Dashboard.module.sass";

type DataPanelProps = {
    drone: IDrone;
};

export default function DataPanel(props: DataPanelProps) {
    const { position, angle } = props.drone;

    return (
        <Panel className={styles.data}>
            <div>
                <span>posX: {position.x}</span>
                <br />
                <span>posY: {position.y}</span>
                <br />
                <span>posZ: {position.z}</span>
            </div>
            <div>
                <span>angleX: {angle.x}</span>
                <br />
                <span>angleY: {angle.y}</span>
                <br />
                <span>angleZ: {angle.z}</span>
            </div>
        </Panel>
    );
}
