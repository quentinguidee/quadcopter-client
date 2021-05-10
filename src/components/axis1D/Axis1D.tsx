import React from "react";

import styles from "./sass/Axis1D.module.sass";

type Axis1DProps = {
    name: string;
    value: number;
    min: number;
    max: number;
};

export default function Axis1D(props: Axis1DProps) {
    const { min, max, value } = props;

    const percentage = (100 * value) / (max - min);

    return (
        <div className={styles.axis1D}>
            <div className={styles.zone}>
                <span className={styles.value}>{props.value}</span>
                <div
                    className={styles.jauge}
                    style={{ maxHeight: `${percentage}%` }}
                />
            </div>
            <span className={styles.name}>{props.name}</span>
        </div>
    );
}
