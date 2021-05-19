import React from "react";
import Panel from "../../components/panel/Panel";
import Timeline from "../../components/timeline/Timeline";
import { ITime } from "../../hooks/Timer";

type ProcedurePanelProps = {
    currentTime: ITime;
};

export default function ProcedurePanel(props: ProcedurePanelProps) {
    return (
        <Panel>
            <Timeline
                rangeInSeconds={30}
                currentTime={props.currentTime}
                elements={[]}
            />
        </Panel>
    );
}
