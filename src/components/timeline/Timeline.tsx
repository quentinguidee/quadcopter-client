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

type LineProps = {
    start: ITime;
    end: ITime;
    currentTime: ITime;
    rangeInSeconds: number;
};

function Line(props: LineProps) {
    const getStyleLineColored = (): CSSProperties => {
        const diff = durationBetween(props.start, props.currentTime);
        const coeff = props.currentTime.minus ? 1 : -1;

        let percentage = (100 * (diff * coeff)) / props.rangeInSeconds;

        const positionLineColored = `calc(${
            percentage <= -50 ? -50 : percentage
        }% + 50%)`;

        return { left: positionLineColored };
    };

    const getStyleLine = (): CSSProperties => {
        const diff = durationBetween(props.currentTime, props.end);

        let percentage = (100 * (diff * -1) + 1) / props.rangeInSeconds;

        const positionLine = `calc(${
            percentage >= 50 ? 50 : percentage
        }% + 50%)`;

        return { right: positionLine };
    };

    return (
        <React.Fragment>
            <div className={styles.lineCenter} />
            <div className={styles.lineColored} style={getStyleLineColored()} />
            <div className={styles.line} style={getStyleLine()} />
        </React.Fragment>
    );
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
    start?: ITime;
    stop?: ITime;
    currentTime?: ITime;
    rangeInSeconds: number;
    events: {
        time: ITime;
        title: string;
    }[];
};

export default function Timeline(props: TimelineProps) {
    if (!props.start || !props.stop || !props.currentTime)
        return <React.Fragment />;

    const elements = props.events.map((el) => (
        <Element
            key={el.title}
            title={el.title}
            time={el.time}
            rangeInSeconds={props.rangeInSeconds}
            currentTime={props.currentTime!}
        />
    ));

    return (
        <React.Fragment>
            <Countdown time={props.currentTime} />
            <div className={styles.timeline}>
                <Line
                    start={props.start}
                    end={props.stop}
                    rangeInSeconds={props.rangeInSeconds}
                    currentTime={props.currentTime}
                />
                {elements}
            </div>
        </React.Fragment>
    );
}
