import { SERVER_ERROR } from "../../ui/error_messages";

import styles from "../../styles/error/Errors.module.css";
export default function ServerError() {
    return (
        <>
            <div className={styles["server-error"]}>{SERVER_ERROR}</div>
        </>
    );
}