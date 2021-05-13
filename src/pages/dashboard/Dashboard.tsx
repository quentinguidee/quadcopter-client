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
import View3DGyro from "./View3DGyro";

export type State = "unknown" | "disconnected" | "on" | "off";
export type LedState = "disconnected" | "on" | "off";
export type MotorState = "disconnected" | "on" | "off";
export type AccelerometerState = "disconnected" | "on";

export type Coordinate = {
    x: number;
    y: number;
    z: number;
};

export type IMotor = {
    state: MotorState;
    speed?: number;
};

export type Motors = {
    motor1: IMotor;
    motor2: IMotor;
    motor3: IMotor;
    motor4: IMotor;
};

export type LedsState = {
    led1: LedState;
    led2: LedState;
    led3: LedState;
    led4: LedState;
};

export type IDrone = {
    state: State;
    accelerometer: AccelerometerState;
    position: Coordinate;
    angle: Coordinate;
    leds: LedsState;
    motors: Motors;
};

export default function Dashboard() {
    const [drone, setDrone] = useState<IDrone>({
        state: "unknown",
        accelerometer: "disconnected",
        position: { x: 0, y: 0, z: 0 },
        angle: { x: 0, y: 0, z: 0 },
        leds: {
            led1: "disconnected",
            led2: "disconnected",
            led3: "disconnected",
            led4: "disconnected",
        },
        motors: {
            motor1: { state: "disconnected", speed: undefined },
            motor2: { state: "disconnected", speed: undefined },
            motor3: { state: "disconnected", speed: undefined },
            motor4: { state: "disconnected", speed: undefined },
        },
    });

    const listenSocket = () => {
        socket.on("state", (state) => {
            setDrone((previous) => ({ ...previous, state }));
        });

        socket.on("leds", (leds) => {
            setDrone((previous) => ({ ...previous, leds }));
        });

        socket.on("motors", (motors) => {
            setDrone((previous) => ({ ...previous, motors }));
        });

        socket.on("accelerometer", (accelerometer) => {
            setDrone((previous) => ({ ...previous, accelerometer }));
        });

        socket.on("position", (position) => {
            setDrone((previous) => ({ ...previous, position }));
        });

        socket.on("angle", (angle) => {
            setDrone((previous) => ({ ...previous, angle }));
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
                        <MotorsPanel motors={drone.motors} />
                        <View3DGyro angle={drone.angle} />
                        <LayoutSpace />
                        <CameraPanel />
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}
