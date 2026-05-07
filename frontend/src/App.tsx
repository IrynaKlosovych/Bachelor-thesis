import { useEffect } from "react";
import styles from '../src/styles/App.module.css';
import useWindowWidth from "./hooks/useWindowWidth";
import { SCREEN } from "./constants/constants";
import ScreenSizeWarning from './components/windowSize/ScreenSizeWarning';
import DefaultLayout from './components/windowSize/DefaultLayout';

function App() {
  const width = useWindowWidth();
  const isBlocked = width < SCREEN.MIN_WORKING_WIDTH_PX;
  useEffect(() => {
    if (isBlocked) {
      (document.activeElement as HTMLElement | null)?.blur();
    }
  }, [isBlocked]);

  return (
    <>
      <div data-testid="warning"
        aria-hidden={!isBlocked}
        className={isBlocked ? styles.block : styles.hidden}>
        <ScreenSizeWarning />
      </div>
      <div data-testid="layout"
        aria-hidden={isBlocked}
        className={isBlocked ? styles.hidden : styles.block}>
        <DefaultLayout></DefaultLayout>
      </div>
    </>
  );
}

export default App;
