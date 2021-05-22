import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Layout from "../../components/layout/Layout";
import Panel from "../../components/panel/Panel";
import Timeline from "../../components/timeline/Timeline";
import { server } from "../../server";

export type ITime = {
    minus: boolean;
    minutes: number;
    seconds: number;
};

export type ITimer = {
    canReset: boolean;
    finished: boolean;
    forceStopped: boolean;
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

    const reset = () => {
        server
            .post(`/procedures/${procedure}/reset`)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    };

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

                if (
                    !props.currentTimer?.forceStopped &&
                    props.currentTimer?.canReset
                ) {
                    setTimeout(() => {
                        server
                            .post("/procedures/motors-test/start")
                            .then((res) => console.log(res.data))
                            .catch((err) => console.log(err));
                    }, 1000);
                }
            });
        };

        refreshEvents();
    }, [
        procedure,
        props.currentTimer?.canReset,
        props.currentTimer?.forceStopped,
    ]);

    useEffect(() => {
        setProcedure(props.procedure);
    }, [props.procedure]);

    let content: any;

    if (!procedure) {
        content = (
            <Button value="motors test" onClick={startMotorsTestProcedure} />
        );
    } else {
        const eventsFormatted = events.map((procedure) => ({
            time: procedure.time,
            title: procedure.name,
        }));

        let buttons;

        if (props.currentTimer?.finished || props.currentTimer?.forceStopped) {
            buttons = <Button value="reset" onClick={reset} />;
        }

        content = (
            <React.Fragment>
                <Layout orientation="vertical" style={{ gap: "16px" }}>
                    <div>
                        <Timeline
                            start={start}
                            stop={stop}
                            rangeInSeconds={10}
                            currentTime={props.currentTimer?.current || start}
                            events={eventsFormatted}
                        />
                    </div>
                    {buttons}
                </Layout>
            </React.Fragment>
        );
    }

    return <Panel>{content}</Panel>;
}
