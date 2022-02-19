import { useEffect, useRef } from 'react';

/**
 * Runs the callback function with the interval delay
 * @param callback function that will be run every time interval delay passes
 * @param delay interval delay, pass undefined to stop the interval
 */
const useInterval = (callback: () => void, delay?: number): void => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const intervalId = setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [delay]);
};

export default useInterval;
