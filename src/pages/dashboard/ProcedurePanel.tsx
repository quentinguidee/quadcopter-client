import React, { useState } from "react";
import Button from "../../components/button/Button";
import Panel from "../../components/panel/Panel";
import Timeline from "../../components/timeline/Timeline";
import { server } from "../../server";

export type ITime = {
    minus: boolean;
    minutes: number;
    seconds: number;
};

type Event = {
    name: string;
    time: ITime;
    request: string;
};

type ProcedurePanelProps = {
    currentTime?: ITime;
};

export default function ProcedurePanel(props: ProcedurePanelProps) {
    const [start, setStart] = useState<ITime>();
    const [stop, setStop] = useState<ITime>();

    const [events, setEvents] = useState<Event[]>([]);

    const startMotorsTestProcedure = () => {
        server.get("/procedures/motors-test").then((res) => {
            const procedure = res.data.procedure;

            setEvents(procedure.events);
            setStart(procedure.start);
            setStop(procedure.stop);

            setTimeout(() => {
                server.post("/procedures/motors-test/start");
            }, 1000);
        });
    };

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
                    currentTime={props.currentTime || start}
                    events={eventsFormatted}
                />
            </React.Fragment>
        );
    }

    return <Panel>{content}</Panel>;
}
