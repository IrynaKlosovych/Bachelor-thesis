import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import DefaultLayout from './components/windowSize/DefaultLayout';
import ScreenSizeWarning from './components/windowSize/ScreenSizeWarning';
import { SCREEN } from "./constants/screen";
import useWindowWidth from "./hooks/screen/useWindowWidth";

import styles from '../src/styles/App.module.css';

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
      <ToastContainer
        autoClose={false}
        closeOnClick={false} />
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
