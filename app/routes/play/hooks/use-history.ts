import { useCallback, useRef } from "react";

interface HistoryEntry {
  index: number;
  letter: string;
}

export function useHistory() {
  const history = useRef<Array<HistoryEntry>>([]);
  const pointer = useRef<number>(0);

  const push = useCallback((index: number, letter: string) => {
    history.current.push({ index, letter });
    pointer.current = history.current.length - 1;
  }, []);

  const clear = useCallback(() => {
    history.current = [];
    pointer.current = 0;
  }, []);

  const undo = useCallback((cb: (entry: HistoryEntry) => void) => {
    const entry = history.current[pointer.current];
    if (history.current.length === 0 || !entry) {
      return;
    }
    cb(entry);
    pointer.current -= 1;
  }, []);

  const redo = useCallback((cb: (entry: HistoryEntry) => void) => {
    pointer.current += 1;
    let entry = history.current[pointer.current];
    if (!entry) {
      pointer.current -= 1;
      entry = history.current[pointer.current];
    }

    cb(entry);
  }, []);

  return { push, clear, undo, redo };
}
