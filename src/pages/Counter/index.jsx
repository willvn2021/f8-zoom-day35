import React, { useState } from "react";
import styles from "./Counter.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

function Counter() {
    const [count, setCount] = useState(0);

    const status = count > 0 ? "Dương" : count < 0 ? "Âm" : "Bằng không";
    const colorClass = count > 0 ? "positive" : count < 0 ? "negative" : "zero";

    return (
        <div className={styles.card}>
            <div className={styles.display}>
                <div className={`${styles.value} ${styles[colorClass]}`}>
                    {count}
                </div>
            </div>
            <div className={`${styles.status} ${styles[colorClass]}`}>
                Trạng thái: {status}
            </div>
            <div className={styles.controls}>
                <button
                    className={styles.btn}
                    onClick={() => setCount(count - 1)}
                >
                    -
                </button>
                <button className={styles.btn} onClick={() => setCount(0)}>
                    <FontAwesomeIcon icon={faRedo} />
                </button>
                <button
                    className={styles.btn}
                    onClick={() => setCount(count + 1)}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default Counter;
