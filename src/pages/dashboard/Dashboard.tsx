import React from "react";
import Layout from "../../components/layout/Layout";
import LayoutSpace from "../../components/layout/LayoutSpace";
import Panel from "../../components/panel/Panel";
import ActionsPanel from "./ActionsPanel";

import styles from "./sass/Dashboard.module.sass";

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <Layout fullSize orientation="horizontal">
                <Layout orientation="vertical">
                    <ActionsPanel />
                    <Panel>Accelerometer</Panel>
                    <Panel grow={1}>Logs</Panel>
                </Layout>
                <Layout grow={1} orientation="vertical">
                    <Panel grow={4}>2D View</Panel>
                    <Layout orientation="horizontal">
                        <Panel>Motors</Panel>
                        <LayoutSpace />
                        <Panel>Camera</Panel>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}
