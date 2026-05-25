import { SCREEN_DEFAULT_MESSAGE } from "../../ui/screen_messages";

import styles from "../../styles/windowSize/DefaultMessage.module.css";
export default function DefaultMessage() {
    return (
        <>
            <div className={styles["title-page"]}>
                <div className={styles['title-block']}>
                    <h1>{SCREEN_DEFAULT_MESSAGE.title}</h1>
                </div>
            </div>
            <div className={styles['alert-message']}>
                <div>
                    <div className={styles['alert-title-message']}>{SCREEN_DEFAULT_MESSAGE.titleMessage}
                    </div>
                    <div className={styles['alert-text-message']}>{SCREEN_DEFAULT_MESSAGE.textMessage}
                    </div>
                </div>
            </div>
        </>
    );
}