import React from "react";
import Layout from "../../components/layout/Layout";
import LayoutSpace from "../../components/layout/LayoutSpace";
import AccelerometerPanel from "./AccelerometerPanel";
import ActionsPanel from "./ActionsPanel";
import LogsPanel from "./LogsPanel";
import MotorsPanel from "./MotorsPanel";
import CameraPanel from "./CameraPanel";
import View2DPanel from "./View2DPanel";

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
                    <View2DPanel />
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
