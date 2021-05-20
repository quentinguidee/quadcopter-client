import React, { CSSProperties } from "react";

import classNames from "classnames";

import { ITime } from "../../pages/dashboard/ProcedurePanel";

import styles from "./sass/Timeline.module.sass";

function timeInSeconds(time: ITime) {
    return time.minutes * 60 + time.seconds;
}

function durationBetween(timeA: ITime, timeB: ITime) {
    const A = timeInSeconds(timeA);
    const B = timeInSeconds(timeB);

    if (timeA.minus !== timeB.minus) return A + B;
    return B - A;
}

function Line() {
    return <div className={styles.line} />;
}

type DotProps = {
    colored: boolean;
};

function Dot(props: DotProps) {
    return (
        <div
            className={classNames({
                [styles.dot]: true,
                [styles.dotColored]: props.colored,
            })}
        />
    );
}

type TimeProps = {
    time: ITime;
    colored: boolean;
};

function Time(props: TimeProps) {
    const { minus, minutes, seconds } = props.time;

    const content = `T${minus ? "-" : "+"}${minutes}:${seconds}`;

    return (
        <div
            className={classNames({
                [styles.time]: true,
                [styles.timeColored]: props.colored,
            })}
        >
            {content}
        </div>
    );
}

type LabelProps = {
    title: string;
    colored: boolean;
};

function Label(props: LabelProps) {
    return (
        <div
            className={classNames({
                [styles.label]: true,
                [styles.labelColored]: props.colored,
            })}
        >
            {props.title}
        </div>
    );
}

export type ElementProps = {
    currentTime: ITime;
    time: ITime;
    rangeInSeconds: number;
    title: string;
};

function Element(props: ElementProps) {
    const diff = durationBetween(props.time, props.currentTime);
    const coeff = props.currentTime.minus ? 1 : -1;

    const position = `calc(${
        (100 * (diff * coeff - 1)) / props.rangeInSeconds
    }% + 50%)`;
    let style: CSSProperties = { left: position };

    const colored = diff * coeff <= 0;

    return (
        <div className={styles.element} style={style}>
            <Time colored={colored} time={props.time} />
            <div className={styles.decoration}>
                <Dot colored={colored} />
            </div>
            <Label colored={colored} title={props.title} />
        </div>
    );
}

type CountdownProps = {
    time: ITime;
};

function Countdown(props: CountdownProps) {
    const { minus, minutes, seconds } = props.time;

    const content = `T${minus ? "-" : "+"}${minutes}:${seconds}`;

    return <div className={styles.countdown}>{content}</div>;
}

type TimelineProps = {
    currentTime: ITime;
    rangeInSeconds: number;
    elements: {
        time: ITime;
        title: string;
    }[];
};

export default function Timeline(props: TimelineProps) {
    const elements = props.elements.map((el) => (
        <Element
            key={el.title}
            title={el.title}
            time={el.time}
            rangeInSeconds={props.rangeInSeconds}
            currentTime={props.currentTime}
        />
    ));
    return (
        <React.Fragment>
            <Countdown time={props.currentTime} />
            <div className={styles.timeline}>
                <Line />
                {elements}
            </div>
        </React.Fragment>
    );
}
