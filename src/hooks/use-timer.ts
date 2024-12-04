import { useEffect, useRef, useState } from "react";

const ONE_HOUR = 60 * 60;

export function formatTime(time: number) {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function useTimer(defaultTime = 0) {
  const [time, setTime] = useState(defaultTime);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
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
      const seconds = Math.floor(elapsed / 1000);

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

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []);

  return formatTime(time);
}
