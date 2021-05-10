import React from "react";
import Layout from "../../components/layout/Layout";
import LayoutSpace from "../../components/layout/LayoutSpace";
import Panel from "../../components/panel/Panel";
import AccelerometerPanel from "./AccelerometerPanel";
import ActionsPanel from "./ActionsPanel";
import LogsPanel from "./LogsPanel";
import MotorsPanel from "./MotorsPanel";
import CameraPanel from "./CameraPanel";

import styles from "./sass/Dashboard.module.sass";

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <Layout fullSize orientation="horizontal">
                <Layout orientation="vertical">
                    <ActionsPanel />
                    <AccelerometerPanel />
                    <LogsPanel />
                </Layout>
                <Layout grow={1} orientation="vertical">
                    <Panel grow={4}>2D View</Panel>
                    <Layout orientation="horizontal">
                        <MotorsPanel />
                        <LayoutSpace />
                        <CameraPanel />
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}
