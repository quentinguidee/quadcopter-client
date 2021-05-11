import React from "react";

import classNames from "classnames";
import Panel from "../../components/panel/Panel";
import { IDrone, LedState } from "./Dashboard";

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

function Led(props: { name: string }) {
    return <div className={classNames(styles.led, styles[props.name])} />;
}

type LabelProps = {
    name: string;
    label: string;
    color: DotColor;
};

function Label(props: LabelProps) {
    return (
        <div className={classNames(styles.label, styles[props.name])}>
            {props.label}
            <Dot color={props.color} />
        </div>
    );
}

function Drone(props: { drone: IDrone }) {
    const { state, leds } = props.drone;

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
        if (state === "disconnected" || state === "unknown") {
            return "gray";
        }
        return "green";
    };

    return (
        <div className={styles.drone}>
            <div className={styles.droneTop} />
            <div className={styles.droneCenter} />
            <div className={styles.droneBottom} />
            <Led name="ledA" />
            <Led name="ledB" />
            <Led name="ledC" />
            <Led name="ledD" />
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
            <div className={styles.board} />
            <div className={styles.battery} />
            <Label
                name="boardLabel"
                label="Arduino"
                color={getArduinoColor()}
            />
            <Label name="batteryLabel" label="Battery" color="gray" />
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
