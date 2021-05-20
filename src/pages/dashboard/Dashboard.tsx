import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import LayoutSpace from "../../components/layout/LayoutSpace";
import ActionsPanel from "./ActionsPanel";
import MotorsPanel from "./MotorsPanel";
import CameraPanel from "./CameraPanel";
import View2DPanel from "./View2DPanel";

import styles from "./sass/Dashboard.module.sass";
import { socket } from "../../socket";
import View3DGyro from "./View3DGyro";
import ProcedurePanel, { ITime } from "./ProcedurePanel";

export type State =
    | "unknown"
    | "disconnected"
    | "on"
    | "off"
    | "motorstest"
    | "failed-to-setup"
    | "in-setup";

export type LedState = "disconnected" | "on" | "off";
export type MotorState = "disconnected" | "on" | "off" | "failed-to-setup";
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

    const [time, setTime] = useState<ITime>();

    const sockets = [
        "state",
        "leds",
        "motors",
        "accelerometer",
        "position",
        "angle",
    ];

    const listenSocket = () => {
        sockets.forEach((s) => {
            socket.on(s, (packet) => {
                setDrone((previous) => ({ ...previous, [s]: packet }));
            });
        });

        socket.on("timer", (time) => setTime(time));
    };

    const unlistenSocket = () => {
        sockets.forEach((s) => socket.off(s));
        socket.off("timer");
    };

    useEffect(() => {
        listenSocket();
        return () => unlistenSocket();
    });

    return (
        <div className={styles.dashboard}>
            <Layout fullSize orientation="horizontal">
                <Layout orientation="vertical">
                    <ProcedurePanel currentTime={time} />
                    <ActionsPanel state={drone.state} />
                    {/* <AccelerometerPanel /> */}
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
