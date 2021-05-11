import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import LayoutSpace from "../../components/layout/LayoutSpace";
import AccelerometerPanel from "./AccelerometerPanel";
import ActionsPanel from "./ActionsPanel";
import LogsPanel from "./LogsPanel";
import MotorsPanel from "./MotorsPanel";
import CameraPanel from "./CameraPanel";
import View2DPanel from "./View2DPanel";

import styles from "./sass/Dashboard.module.sass";
import { socket } from "../../server";

export type State = "unknown" | "disconnected" | "on" | "off";

export default function Dashboard() {
    const [state, setState] = useState<State>("unknown");

    const listenState = () => {
        socket.on("state", (state) => {
            setState(state);
        });
    };

    useEffect(() => {
        listenState();
    }, []);

    return (
        <div className={styles.dashboard}>
            <Layout fullSize orientation="horizontal">
                <Layout orientation="vertical">
                    <ActionsPanel state={state} />
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
