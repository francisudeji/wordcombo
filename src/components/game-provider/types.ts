export interface GameState {
  count: number;
  board: string[][];
  currentWord: string[];
  wordLadder: {
    startWord: string;
    targetWord: string;
  };
  message: string;
}

export interface GameActions {
  type: "keyboardClick" | "message";
  payload?: string;
}
