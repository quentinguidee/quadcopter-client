import React from "react";
import Dashboard from "../../pages/dashboard/Dashboard";

import styles from "./sass/App.module.sass";

export default function App() {
    return (
        <div className={styles.app}>
            <Dashboard />
        </div>
    );
}
