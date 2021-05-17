import React, { CSSProperties } from "react";

import classNames from "classnames";
import Panel from "../../components/panel/Panel";
import { IDrone, LedState, IMotor } from "./Dashboard";

import styles from "./sass/View2D.module.sass";

type DotColor = "green" | "orange" | "red" | "gray";

type DotProps = {
    color: DotColor;
};

function Dot(props: DotProps) {
    let color;
    switch (props.color) {
        case "green":
            color = "#43cc19";
            break;
        case "orange":
            color = "#e79b29";
            break;
        case "red":
            color = "#e73f29";
            break;
        case "gray":
            color = "#7c7c7c";
            break;
    }
    return (
        <div
            className={styles.dot}
            style={{
                backgroundColor: color,
            }}
        />
    );
}

type LedColor = "off" | "blue" | "red";

type LedProps = {
    name: string;
    color: LedColor;
    on: boolean;
};

function Led(props: LedProps) {
    let color;
    if (props.on) {
        switch (props.color) {
            case "blue":
                color = "#3d92b9";
                break;
            case "red":
                color = "#b93d3d";
                break;
        }
    }

    return (
        <div
            className={classNames(styles.led, styles[props.name])}
            style={{ backgroundColor: color }}
        />
    );
}

type MotorProps = {
    name: string;
    on: boolean;
    clockwise: boolean;
};

function Motor(props: MotorProps) {
    return (
        <div
            className={classNames({
                [styles.motor]: true,
                [styles[props.name]]: true,
                [styles.motorOnClockwise]: props.on && props.clockwise,
                [styles.motorOnCounterclockwise]: props.on && !props.clockwise,
            })}
        />
    );
}

type LabelProps = {
    name?: string;
    label: string;
    color: DotColor;
    x?: number;
    y?: number;
};

function Label(props: LabelProps) {
    const style: CSSProperties = {
        transform: props.name ? undefined : "translateY(-50%)",
        left: `calc(50% - ${props.x}px + 30px)`,
        top: `calc(50% - ${props.y}px)`,
    };

    return (
        <div
            className={classNames(styles.label, styles[props.name || ""])}
            style={style}
        >
            {props.label}
            <Dot color={props.color} />
        </div>
    );
}

type BasicComponentProps = {
    x: number;
    y: number;
    height: number;
};

function BasicComponent(props: BasicComponentProps) {
    const style: CSSProperties = {
        left: `calc(50% - ${props.x}px)`,
        top: `calc(50% - ${props.y}px)`,
        height: `${props.height}px`,
    };

    return <div className={styles.component} style={style} />;
}

function Drone(props: { drone: IDrone }) {
    const { state, accelerometer, leds, motors } = props.drone;

    const getLedDotColor = (led: LedState): DotColor => {
        switch (led) {
            case "disconnected":
                return "gray";
            case "off":
                return "gray";
            case "on":
                return "green";
        }
    };

    const getArduinoColor = (): DotColor => {
        if (state === "disconnected" || state === "unknown") return "gray";
        return "green";
    };

    const getMotorColor = (motor: IMotor): DotColor => {
        if (motor.state === "disconnected") return "gray";
        if (motor.state === "failed-to-setup") return "red";
        return "green";
    };

    const getAccelerometerColor = (): DotColor => {
        if (accelerometer === "disconnected") return "gray";
        return "green";
    };

    const motorIsOn = (motor: IMotor) => {
        return motor.speed !== undefined && motor.speed !== 0;
    };

    return (
        <div className={styles.drone}>
            <div className={styles.droneTop} />
            <div className={styles.droneCenter} />
            <div className={styles.droneBottom} />
            <Led name="ledA" color="blue" on={leds.led1 === "on"} />
            <Led name="ledB" color="blue" on={leds.led1 === "on"} />
            <Led name="ledC" color="red" on={leds.led1 === "on"} />
            <Led name="ledD" color="red" on={leds.led1 === "on"} />
            <Label
                name="labelA"
                label="LED A"
                color={getLedDotColor(leds.led1)}
            />
            <Label
                name="labelB"
                label="LED B"
                color={getLedDotColor(leds.led2)}
            />
            <Label
                name="labelC"
                label="LED C"
                color={getLedDotColor(leds.led3)}
            />
            <Label
                name="labelD"
                label="LED D"
                color={getLedDotColor(leds.led4)}
            />
            <Motor name="motorA" on={motorIsOn(motors.motor1)} clockwise />
            <Motor
                name="motorB"
                on={motorIsOn(motors.motor2)}
                clockwise={false}
            />
            <Motor
                name="motorC"
                on={motorIsOn(motors.motor3)}
                clockwise={false}
            />
            <Motor name="motorD" on={motorIsOn(motors.motor4)} clockwise />
            <Label
                name="motorLabelA"
                label="MOTOR A"
                color={getMotorColor(motors.motor1)}
            />
            <Label
                name="motorLabelB"
                label="MOTOR B"
                color={getMotorColor(motors.motor2)}
            />
            <Label
                name="motorLabelC"
                label="MOTOR C"
                color={getMotorColor(motors.motor3)}
            />
            <Label
                name="motorLabelD"
                label="MOTOR D"
                color={getMotorColor(motors.motor4)}
            />
            <BasicComponent x={0} y={-40} height={50} />
            <BasicComponent x={0} y={30} height={30} />
            <BasicComponent x={0} y={0} height={20} />
            <BasicComponent x={0} y={-80} height={20} />
            <Label x={0} y={-40} label="Arduino" color={getArduinoColor()} />
            <Label x={0} y={30} label="Battery" color="gray" />
            <Label
                x={0}
                y={0}
                label="Accelerometer"
                color={getAccelerometerColor()}
            />
            <Label x={0} y={-80} label="WiFi" color="gray" />
        </div>
    );
}

type View2DPanelProps = {
    drone: IDrone;
};

export default function View2DPanel(props: View2DPanelProps) {
    return (
        <Panel
            style={{
                display: "flex",
                justifyContent: "center",
            }}
            grow={1}
        >
            <Drone drone={props.drone} />
        </Panel>
    );
}
