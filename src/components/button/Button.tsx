import classNames from "classnames";
import React from "react";

import styles from "./sass/Button.module.sass";

type ButtonProps = {
    value: string;
    onClick: () => void;
    disabled?: boolean;
};

export default function Button(props: ButtonProps) {
    return (
        <div
            className={classNames({
                [styles.button]: true,
                [styles.disabled]: props.disabled,
            })}
            onClick={props.onClick}
        >
            {props.value.toUpperCase()}
        </div>
    );
}
