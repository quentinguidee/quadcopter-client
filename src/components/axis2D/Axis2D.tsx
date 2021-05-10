import classNames from "classnames";
import React from "react";

import styles from "./sass/Axis2D.module.sass";

type Axis2DProps = {
    title: string;
};

export default function Axis2D(props: Axis2DProps) {
    return (
        <div className={styles.axis2D}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.zone}>
                <div className={classNames(styles.line, styles.lineV)} />
                <div className={classNames(styles.line, styles.lineH)} />
                <div className={styles.dot} />
            </div>
        </div>
    );
}
