import React, { useEffect, useState } from "react";
import Panel from "../../components/panel/Panel";
import { socket } from "../../socket";

import styles from "./sass/Dashboard.module.sass";

type ILog = {
    message: string;
};

function Log(props: { log: ILog }) {
    const { message } = props.log;

    return (
        <div className={styles.logsItem}>
            <span className={styles.logsMessage}>{message}</span>
        </div>
    );
}

export default function LogsPanel() {
    const [logs, setLogs] = useState<ILog[]>([]);

    const listenLogs = () => {
        socket.on("logs", (log) => {
            setLogs((previous) => [
                {
                    message: log,
                },
                ...previous,
            ]);
        });
    };

    useEffect(() => {
        listenLogs();
    }, []);

    const items = logs.map((log, i) => <Log key={i} log={log} />);

    return (
        <Panel className={styles.logs} grow={1}>
            <div className={styles.logsItems}>{items}</div>
        </Panel>
    );
}
