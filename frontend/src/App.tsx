import styles from '../src/styles/App.module.css';
import useWindowWidth from "./hooks/useWindowWidth";
import { SCREEN } from "./constants/constants";
import ScreenSizeWarning from './components/windowSize/ScreenSizeWarning';
import DefaultLayout from './components/windowSize/DefaultLayout';

function App() {
  const width = useWindowWidth();
  const isBlocked = width < SCREEN.MIN_WORKING_WIDTH_PX;

  return (
    <>
      <div className={isBlocked ? styles.block : styles.hidden}>
        <ScreenSizeWarning />
      </div>
      <div className={isBlocked ? styles.hidden : styles.block}>
        <DefaultLayout></DefaultLayout>
      </div>
    </>
  );
}

export default App;
