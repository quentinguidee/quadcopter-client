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

export type LedState = "disconnected" | "on" | "off";

export type LedsState = {
    led1: LedState;
    led2: LedState;
    led3: LedState;
    led4: LedState;
};

export type IDrone = {
    state: State;
    leds: LedsState;
};

export default function Dashboard() {
    const [drone, setDrone] = useState<IDrone>({
        state: "unknown",
        leds: {
            led1: "disconnected",
            led2: "disconnected",
            led3: "disconnected",
            led4: "disconnected",
        },
    });

    const listenSocket = () => {
        socket.on("state", (state) => {
            setDrone((previous) => ({
                ...previous,
                state: state,
            }));
        });

        socket.on("leds", (leds) => {
            setDrone((previous) => ({
                ...previous,
                leds: leds,
            }));
        });
    };

    useEffect(() => {
        listenSocket();
    }, []);

    return (
        <div className={styles.dashboard}>
            <Layout fullSize orientation="horizontal">
                <Layout orientation="vertical">
                    <ActionsPanel state={drone.state} />
                    <AccelerometerPanel />
                    <LogsPanel />
                </Layout>
                <Layout grow={1} orientation="vertical">
                    <View2DPanel drone={drone} />
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
