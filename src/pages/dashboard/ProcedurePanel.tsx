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

type Procedure = {
    name: string;
    time: ITime;
    request: string;
};

type ProcedurePanelProps = {
    currentTime: ITime;
};

export default function ProcedurePanel(props: ProcedurePanelProps) {
    const [procedure, setProcedure] = useState<Procedure[]>([]);

    const startMotorsTestProcedure = () => {
        server.get("/procedures/motors-test").then((res) => {
            setProcedure(res.data.procedure.events);
            server.post("/procedures/motors-test/start");
        });
    };

    let content: any;

    if (procedure.length === 0) {
        content = (
            <Button value="motors test" onClick={startMotorsTestProcedure} />
        );
    } else {
        const elements = procedure.map((procedure) => ({
            time: procedure.time,
            title: procedure.name,
        }));

        content = (
            <React.Fragment>
                <Timeline
                    rangeInSeconds={15}
                    currentTime={props.currentTime}
                    elements={elements}
                />
            </React.Fragment>
        );
    }

    return <Panel>{content}</Panel>;
}
