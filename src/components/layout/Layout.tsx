import classNames from "classnames";
import React from "react";

import styles from "./sass/Layout.module.sass";

type LayoutProps = {
    orientation: "vertical" | "horizontal";
    grow?: number;
    fullSize?: boolean;
    fullWidth?: boolean;
} & React.HTMLProps<HTMLDivElement>;

export default function Layout(props: LayoutProps) {
    return (
        <div
            {...props}
            style={{
                flexGrow: props.grow,
                height: props.fullSize ? "100%" : undefined,
                width: props.fullSize ? "100%" : undefined,
            }}
            className={classNames({
                [styles.layout]: true,
                [styles.vertical]: props.orientation === "vertical",
                [styles.horizontal]: props.orientation === "horizontal",
            })}
        />
    );
}
