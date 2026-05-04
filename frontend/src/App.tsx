import styles from '../src/styles/App.module.css';
import useWindowWidth from "./hooks/useWindowWidth";
import { SCREEN_BLOCK_MESSAGE } from "./ui/messages";
import { SCREEN } from "./constants/constants";

function App() {
  const width = useWindowWidth();
  const isBlocked = width < SCREEN.MIN_WORKING_WIDTH;

  return (
    <>
      <div className={isBlocked ? styles.block : styles.hidden}>
        <div className={styles["screen-block-message"]}>
          <div>
            {SCREEN_BLOCK_MESSAGE}
          </div>
        </div>
      </div>
      <div className={isBlocked ? styles.hidden : styles.block}>
        <div className={styles["title-page"]}>
          <div className={styles['title-block']}>
            <h1>Симулятор для аналізу та прогнозу результатів виборів</h1>
          </div>
        </div>
        <div className={styles['alert-message']}>
          <div>
            <div className={styles['alert-title-message']}>Цей симулятор розроблено з навчально-дослідницькою метою!</div>
            <div className={styles['alert-text-message']}>Метою симулятора для політичного аналізу та прогнозування результатів виборів є на основі характеристик представників електорату, зовнішніх чинників (що можуть описувати стан країни), характеристик кандидатів дослідити фактори, що впливають на голосування за певного кандидата, а також проаналізуваати результати за різними виборчими системами.</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
