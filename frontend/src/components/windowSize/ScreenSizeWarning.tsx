import { SCREEN, UNITS } from "../../constants/constants";
import { SCREEN_SIZE_WARNING } from "../../ui/messages";

import styles from "./../../styles/windowSize/ScreenSizeWarning.module.css";

export default function ScreenSizeWarning() {
  return (
    <>
      <div className={styles["screen-block-message"]}>
        <div>
          <div className={styles["screen-block-title"]}>
            {SCREEN_SIZE_WARNING.title}
          </div>

          <div className={styles["screen-block-text"]}>
            {SCREEN_SIZE_WARNING.description}{" "}
            {SCREEN_SIZE_WARNING.recommendation} {" "}
            <span className={styles["min-need-size"]}>
              {SCREEN.MIN_WORKING_WIDTH_PX}{UNITS.px}
            </span>
          </div>
        </div>
      </div>
    </>);
};