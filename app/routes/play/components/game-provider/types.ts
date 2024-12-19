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

interface GameActionType {
  message: string;
  key_clicked: string;
  toggle_paused: boolean;
}

export type GameActions = {
  [K in keyof GameActionType]: {
    type: K;
    payload: GameActionType[K];
  };
}[keyof GameActionType];
