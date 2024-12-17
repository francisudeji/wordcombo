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
}

export interface GameActions {
  type: "message" | "key_clicked" | "toggle_paused";
  payload?: string;
}
