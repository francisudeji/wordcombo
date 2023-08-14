import * as React from "react";

interface GameState {
  board: string[][];
  currentWord: string[];
  wordLadder: {
    startWord: string;
    targetWord: string;
  };
}

interface GameActions {
  type: "increment" | "decrement" | "keyboard-click";
  payload?: string;
}

export const GameContext = React.createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameActions>;
}>({
  state: {
    board: [],
    currentWord: [],
    wordLadder: { startWord: "COLD", targetWord: "WARM" },
  },
  dispatch: () => null,
});

function gameReducer(state: GameState, action: GameActions) {
  console.log("called with", action);
  switch (action.type) {
    case "keyboard-click": {
      if (!action.payload) return state;

      // const { payload: input } = action;
      // const { board: word, currentWord, wordLadder } = state;
      if (action.payload === "BACK") {
        if (state.currentWord.length === 0) state;

        const newLetters = state.currentWord.slice(
          0,
          state.currentWord.length - 1
        );
        // setCurrentWord(() => newLetters);
        // state.currentWord = newLetters;
        return Object.assign(state, { currentWord: newLetters });
      }

      if (action.payload === "ENTER") {
        // TODO: lookup word in the dictionary

        const isNotCompleteWord = state.currentWord.length < 4;
        if (isNotCompleteWord) return state;

        // Check that the first word is the start word
        if (
          state.board.length === 0 &&
          state.currentWord.join("") !== state.wordLadder.startWord
        ) {
          // must be the start word
          console.log(`Start word must be ${state.wordLadder.startWord}`);
          return state;
        }

        if (state.board.length > 0) {
          // make sure whatever word typed is only one letter different from the last
          const lastWord = state.board.at(0) || [];
          const changedLetters = [];

          for (let i = 0; i < lastWord.length; i++) {
            if (lastWord.includes(state.currentWord[i])) {
              continue;
            } else {
              changedLetters.push(state.currentWord[i]);
            }
          }

          if (changedLetters.length > 1) {
            // changed more than one letter
            console.log("NO", changedLetters);
            return state;
          }
        }

        // setCurrentWord(() => []);
        // state.currentWord = [];
        const newWord = [state.currentWord, ...state.board];
        // setWord(() => newWord);
        // state.board = newWord;

        for (let i = 0; i < state.wordLadder.targetWord.length; i++) {
          const matches =
            state.currentWord[i] === state.wordLadder.targetWord[i];

          if (matches) {
            console.log(`Matches at ${state.currentWord[i]}`);
          }

          const partialMatch = state.wordLadder.targetWord.includes(
            state.currentWord[i]
          );
          if (partialMatch) {
            console.log(`Partial match at ${state.currentWord[i]}`);
          }
        }

        return Object.assign(state, { currentWord: [], board: newWord });
      }

      const isCurrentWordFilledWithActualLetters = state.currentWord.filter(
        (l: string) => Boolean(l)
      );

      if (isCurrentWordFilledWithActualLetters.length > 3) return state;

      // setCurrentWord((prevLetters) => {
      //   return [...prevLetters, input];
      // });
      state.currentWord = [...state.currentWord, action.payload];
      // return state;
      return Object.assign(state, {
        currentWord: [...state.currentWord, action.payload],
      });
    }

    // case: "get-match" {
    //   if (!action.payload) return state;
    //   const letter = action.payload;
    //   // const handleGetMatch = (letter: string) => {
    //     let isPartialMatch = false;
    //     let isFullMatch = false;

    //     for (let i = 0; i < state.wordLadder.targetWord.length; i++) {
    //       isFullMatch = letter === state.wordLadder.targetWord[i];

    //       isPartialMatch = state.wordLadder.targetWord.includes(letter);
    //     }
    //     // return { isPartialMatch, isFullMatch };
    //     return state;
    //   // };
    // }
    default: {
      return state;
      // throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(gameReducer, {
    board: [],
    currentWord: [],
    wordLadder: { startWord: "COLD", targetWord: "WARM" },
  });

  const value = { state, dispatch };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
