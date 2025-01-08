export interface GameState {
  count: number;
  board: Map<string, string[]>;
  currentWord: string[];
  wordsOfTheDay: {
    start: string;
    target: string;
  };
  message: string;
  paused: boolean;
  cursor: number;
}

export interface GameActionType {
  messageUpdated: string;
  keyClicked: string;
  pauseToggled: boolean;
  cursorMoved: number;
  dragStarted: number;
  dragHovered: number;
  dragDropped: { index: number; letter: string };
  undoTriggered: number;
  redoTriggered: { index: number; letter: string };
}

export type GameActions = {
  [K in keyof GameActionType]: {
    type: K;
    payload: GameActionType[K];
  };
}[keyof GameActionType];
