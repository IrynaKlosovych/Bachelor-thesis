import { SCREEN } from "../constants/constants";
import styles from "../styles/App.module.css"

export const SCREEN_BLOCK_MESSAGE = (
  <>
    <div className={styles["screen-block-title"]}>
      Обмежений розмір екрана
    </div>

    <div className={styles["screen-block-text"]}>
      Поточний розмір екрана є замалим для коректної роботи симулятора.
      Для повного доступу до функціоналу рекомендується використовувати пристрій із шириною екрана від <span className={styles["min-need-size"]}>
        {SCREEN.MIN_WORKING_WIDTH}px
      </span>.
    </div>
  </>
);