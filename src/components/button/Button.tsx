import React from "react";

import styles from "./sass/Button.module.sass";

type ButtonProps = {
    value: string;
    onClick: () => void;
};

export default function Button(props: ButtonProps) {
    return <div className={styles.button}>{props.value.toUpperCase()}</div>;
}
