import React from "react";
import Panel from "../../components/panel/Panel";
import { IDrone } from "./Dashboard";

import styles from "./sass/Dashboard.module.sass";

type DataProps = {
    label: string;
    value?: string | number;
};

function Data(props: DataProps) {
    const { label, value } = props;

    return (
        <span className={styles.dataElement}>
            {label}: {value}
        </span>
    );
}

type DataPanelProps = {
    drone: IDrone;
};

export default function DataPanel(props: DataPanelProps) {
    const { position, angle } = props.drone;

    return (
        <Panel className={styles.data}>
            <div>
                <Data label="posX" value={position.x} />
                <Data label="posY" value={position.y} />
                <Data label="posZ" value={position.z} />
            </div>
            <div>
                <Data label="angleX" value={angle.x} />
                <Data label="angleY" value={angle.y} />
                <Data label="angleZ" value={angle.z} />
            </div>
        </Panel>
    );
}
