import classNames from "classnames";
import React from "react";

import styles from "./sass/Panel.module.sass";

type PanelProps = React.HTMLProps<HTMLDivElement> & {
    grow?: number;
};

export default function Panel(props: PanelProps) {
    return (
        <div
            {...props}
            style={{
                flexGrow: props.grow,
            }}
            className={classNames(styles.panel, props.className)}
        />
    );
}
