import React from "react";
import Panel from "../../components/panel/Panel";

import styles from "./sass/Dashboard.module.sass";

export default function CameraPanel() {
    return (
        <Panel className={styles.camera}>
            <span className={styles.cameraLabel}>CAM1</span>
            <span className={styles.cameraText}>No signal</span>
        </Panel>
    );
}
