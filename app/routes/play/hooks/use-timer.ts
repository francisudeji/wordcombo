import { useCallback, useEffect, useRef, useState } from "react";
import { useGameDispatch, useGameState } from "./use-game";

const ONE_HOUR = 60 * 60;

export function formatTime(time: number) {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function useTimer(defaultTime = 0) {
  const [time, setTime] = useState(defaultTime);
  const globalIsPaused = useGameState((state) => state.paused);
  const rafId = useRef<number | null>(null);
  const lastElapsed = useRef<number>(0);
  const dispatch = useGameDispatch();

  const pauseTimer = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    lastElapsed.current = time; // Save the current time so we can resume from it
    dispatch({ type: "toggle_paused" });
  }, [time, dispatch]);

  const resumeTimer = useCallback(() => {
    function getTime() {
      if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
      ) {
        return performance.now();
      } else {
        return Date.now();
      }
    }

    const startTime = getTime();

    function update() {
      const elapsed = getTime() - startTime;
      const seconds = Math.floor(elapsed / 1000) + lastElapsed.current;

      setTime((prevTime) => {
        if (prevTime >= ONE_HOUR && rafId.current) {
          cancelAnimationFrame(rafId.current);
          return prevTime;
        }

        return seconds;
      });
      rafId.current = requestAnimationFrame(update);
    }

    rafId.current = requestAnimationFrame(update);
  }, []);

  if (globalIsPaused) {
    resumeTimer();
  }

  useEffect(() => {
    resumeTimer();

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [resumeTimer]);

  return {
    time: formatTime(time),
    pauseTimer,
    resumeTimer,
    isPaused: globalIsPaused,
  };
}
