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

export type SelectorKey = keyof GameState | Array<keyof GameState>;

export type Selector<K extends SelectorKey> = (
  state: GameState
) => K extends keyof GameState
  ? Pick<GameState, K>[K]
  : K extends Array<keyof GameState>
  ? Pick<GameState, K[number]>
  : never;
