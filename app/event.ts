import { useSyncExternalStore } from "react";
import type {
  GameActions,
  GameState,
} from "./routes/play/components/game-provider/types";

type GameEvent = {
  state: GameState;
  action: GameActions;
};
const events = new Map<"game-action", CustomEvent<GameEvent>>();
function handleEvent(event: Event, cb: () => void) {
  // console.log("event handled");
  // console.log(event);
  events.set("game-action", event as CustomEvent);
  cb();
}

function subscribe(callback: () => void) {
  window.addEventListener("game-action", (event) =>
    handleEvent(event, callback)
  );
  return () => {
    window.removeEventListener("game-action", (event) =>
      handleEvent(event, callback)
    );
  };
}

function getSnapshot() {
  return events;
}

function getServerSnapshot() {
  return null;
}

export function useEvent() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
