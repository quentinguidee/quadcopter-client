import classNames from "classnames";
import React from "react";
import Panel from "../../components/panel/Panel";

import styles from "./sass/View2D.module.sass";

type DotProps = {
    color: "green" | "orange" | "red";
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
};

function Label(props: LabelProps) {
    return (
        <div className={classNames(styles.label, styles[props.name])}>
            {props.label}
            <Dot color="green" />
        </div>
    );
}

function Drone() {
    return (
        <div className={styles.drone}>
            <div className={styles.droneTop} />
            <div className={styles.droneCenter} />
            <div className={styles.droneBottom} />
            <Led name="ledA" />
            <Led name="ledB" />
            <Led name="ledC" />
            <Led name="ledD" />
            <Label name="labelA" label="LED A" />
            <Label name="labelB" label="LED B" />
            <Label name="labelC" label="LED C" />
            <Label name="labelD" label="LED D" />
            <div className={styles.board} />
            <div className={styles.battery} />
            <Label name="boardLabel" label="Arduino" />
            <Label name="batteryLabel" label="Battery" />
        </div>
    );
}

export default function View2DPanel() {
    return (
        <Panel
            style={{
                display: "flex",
                justifyContent: "center",
            }}
            grow={1}
        >
            <Drone />
        </Panel>
    );
}
