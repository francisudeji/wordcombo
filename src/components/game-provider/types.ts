export interface GameState {
  count: number;
  board: Map<string, string[]>;
  currentWord: string[];
  wordsOfTheDay: {
    start: string;
    target: string;
  };
  message: string;
}

export interface GameActions {
  type: "message" | "clicked_key";
  payload?: string;
}
