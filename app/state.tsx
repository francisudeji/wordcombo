import { useCallback, useEffect, useSyncExternalStore } from "react";
import type {
  GameActions,
  GameState,
} from "./routes/play/components/game-provider/types";
import { produce, enableMapSet } from "immer";

enableMapSet();
function createInitialState({
  wordsOfTheDay,
}: {
  wordsOfTheDay: GameState["wordsOfTheDay"];
}): GameState {
  if (wordsOfTheDay.start.length !== wordsOfTheDay.target.length) {
    throw new Error("Start and target words must be the same length");
  }

  const board = new Map<string, string[]>();

  return {
    count: wordsOfTheDay.start.length,
    board,
    currentWord: [...wordsOfTheDay.start],
    wordsOfTheDay,
    message: "",
    status: "idle",
    cursor: board.size === 0 ? -1 : 0,
  } satisfies GameState;
}

function createStore(initial: GameState) {
  let state = initial;
  const subscribers = new Set<() => void>();
  const messageSubscribers = new Set<(message: string) => void>();

  return {
    setState(dispatch: ((state: GameState) => GameState) | GameState): void {
      const prevState = state;
      if (dispatch instanceof Function) {
        state = dispatch(state);
      } else {
        state = dispatch;
      }

      subscribers.forEach((cb) => cb());
      if (prevState.message !== state.message) {
        messageSubscribers.forEach((cb) => cb(state.message));
      }
    },
    on: {
      messageUpdated(cb: (message: string) => void) {
        messageSubscribers.add(cb);
        return () => {
          messageSubscribers.delete(cb);
        };
      },
    },
    dispatch(action: GameActions) {
      const prevState = state;
      state = produce(state, (draft) => {
        switch (action.type) {
          case "messageUpdated":
            draft.message = action.payload;
            break;
          case "statusUpdated":
            draft.status = action.payload;
            break;
          default:
            break;
        }
      });

      subscribers.forEach((cb) => cb());

      if (prevState.message !== state.message) {
        messageSubscribers.forEach((cb) => cb(state.message));
      }
    },
    getSnapshot(): GameState {
      return state;
    },
    getServerSnapshot(): GameState {
      return state;
    },
    subscribe(cb: () => void) {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
  };
}

const store = createStore(
  createInitialState({ wordsOfTheDay: { start: "HELLO", target: "WORLD" } })
);

function useGameState<T>(selector: (state: GameState) => T) {
  const selectedState = useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => selector(store.getSnapshot()),
    () => selector(store.getServerSnapshot())
  );

  return [selectedState, store.setState, store.dispatch] as const;
}

function ComponentOne() {
  console.log("rendering comp 1");
  const [board, _, dispatch] = useGameState((state) => state.board);

  return (
    <div className="App">
      comp 1:
      <pre>{JSON.stringify(board, null, 2)}</pre>
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={() => {
          dispatch({ type: "messageUpdated", payload: String(Date.now()) });
        }}
      >
        Update message
      </button>
    </div>
  );
}

function ComponentTwo() {
  console.log("rendering comp 2");
  const [count, setGameState] = useGameState((state) => state.count);

  const handleClick = useCallback(() => {
    setGameState((state) => {
      return { ...state, count: state.count + 1 };
    });
  }, []);

  return (
    <button
      className="bg-orange-500 text-white px-4 py-2"
      onClick={handleClick}
    >
      App clicks: {count}
    </button>
  );
}

function ComponentThree() {
  console.log("rendering comp 3");
  const [message] = useGameState((state) => state.message);

  return (
    <div className="App">
      comp 3:
      <pre>{JSON.stringify(message, null, 2)}</pre>
    </div>
  );
}

function ComponentFour() {
  console.log("rendering comp 4");

  useEffect(() => {
    const unsubscribe = store.on.messageUpdated((message) => {
      console.log("message updated", message);
    });

    return () => unsubscribe();
  }, []);

  const snapshot = store.getSnapshot();

  return (
    <div className="App">
      comp 4:
      <pre>{JSON.stringify(snapshot, null, 2)}</pre>
    </div>
  );
}

export function App() {
  console.log("App");

  return (
    <div className="App">
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
      <ComponentFour />
    </div>
  );
}
