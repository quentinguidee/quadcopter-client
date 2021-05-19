import { useEffect, useState } from "react";

export type ITime = {
    minus: boolean;
    minutes: number;
    seconds: number;
};

export default function useTimer(start: ITime) {
    const [time, setTime] = useState<ITime>(start);

    const increment = () => {
        setTime((current) => {
            const { minus, minutes, seconds } = current;

            if (minutes === 0 && seconds === 0) {
                return { ...current, minus: false, seconds: 1 };
            }

            if (minus) {
                if (seconds === 0) {
                    return { ...current, minutes: minutes - 1, seconds: 59 };
                }
                return { ...current, seconds: seconds - 1 };
            }

            if (seconds === 59) {
                return { ...current, minutes: minutes + 1, seconds: 0 };
            }

            return { ...current, seconds: seconds + 1 };
        });
    };

    useEffect(() => {
        let timeout = setTimeout(() => increment(), 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [time]);

    return time;
}
