import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Panel from "../../components/panel/Panel";
import Timeline from "../../components/timeline/Timeline";
import { server } from "../../server";

export type ITime = {
    minus: boolean;
    minutes: number;
    seconds: number;
};

export type ITimer = {
    running: boolean;
    finished: boolean;
    current: ITime;
};

type Event = {
    name: string;
    time: ITime;
    request: string;
};

type ProcedurePanelProps = {
    currentTimer?: ITimer;
    procedure?: string;
};

export default function ProcedurePanel(props: ProcedurePanelProps) {
    const [start, setStart] = useState<ITime>();
    const [stop, setStop] = useState<ITime>();

    const [events, setEvents] = useState<Event[]>([]);

    const [procedure, setProcedure] = useState(props.procedure);

    const startMotorsTestProcedure = () => {
        setProcedure("motors-test");
    };

    useEffect(() => {
        const refreshEvents = () => {
            if (!procedure) return;

            server.get(`/procedures/${procedure}`).then((res) => {
                const procedure = res.data.procedure;

                setProcedure("motors-test");

                setEvents(procedure.events);
                setStart(procedure.start);
                setStop(procedure.stop);

                setTimeout(() => {
                    server.post("/procedures/motors-test/start");
                }, 1000);
            });
        };

        refreshEvents();
    }, [procedure]);

    useEffect(() => {
        setProcedure(props.procedure);
    }, [props.procedure]);

    let content: any;

    if (events.length === 0) {
        content = (
            <Button value="motors test" onClick={startMotorsTestProcedure} />
        );
    } else {
        const eventsFormatted = events.map((procedure) => ({
            time: procedure.time,
            title: procedure.name,
        }));

        content = (
            <React.Fragment>
                <Timeline
                    start={start}
                    stop={stop}
                    rangeInSeconds={15}
                    currentTime={props.currentTimer?.current || start}
                    events={eventsFormatted}
                />
            </React.Fragment>
        );
    }

    return <Panel>{content}</Panel>;
}
