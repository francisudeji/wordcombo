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

export type SelectorKey = keyof GameState | Array<keyof GameState>;

export type Selector<K extends SelectorKey> = (
  state: GameState
) => K extends keyof GameState
  ? Pick<GameState, K>[K]
  : K extends Array<keyof GameState>
  ? Pick<GameState, K[number]>
  : never;
