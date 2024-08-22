import { GameState, GameActions } from "./types";

export function handleEnterClick({
  state,
  nextState,
}: {
  state: GameState;
  nextState: GameState;
}) {
  const isNotCompleteWord = state.currentWord.length < 4;
  if (isNotCompleteWord) {
    nextState.message = "Incomplete word";
    return state;
  }

  // Check that the first word is the start word
  if (
    state.board.length === 0 &&
    state.currentWord.join("") !== state.wordLadder.startWord
  ) {
    // must be the start word
    nextState.message = `Start word must be ${state.wordLadder.startWord}`;
    return state;
  }

  if (state.board.length > 0) {
    // make sure whatever word typed is only one letter different from the last
    const lastWord = state.board.at(-1) || [];
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
      nextState.message = "Can only swap one letter at a time";
      return state;
    }
  }

  const newWord = [...state.board, state.currentWord];

  for (let i = 0; i < state.wordLadder.targetWord.length; i++) {
    const matches = state.currentWord[i] === state.wordLadder.targetWord[i];

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

  nextState.currentWord = [];
  nextState.board = newWord;
}

export function handleBackClick({
  state,
  nextState,
}: {
  state: GameState;
  nextState: GameState;
}) {
  if (state.currentWord.length === 0) state;

  nextState.currentWord = nextState.currentWord.slice(
    0,
    nextState.currentWord.length - 1
  );
}

export function handleAlphabetClick({
  state,
  nextState,
  action,
}: {
  state: GameState;
  nextState: GameState;
  action: GameActions;
}) {
  const isCurrentWordFilledWithActualLetters = state.currentWord.filter(
    (l: string) => Boolean(l)
  );

  if (isCurrentWordFilledWithActualLetters.length > 3) return state;

  nextState.currentWord = [...nextState.currentWord, action.payload as string];
}

export async function handleDictionaryLookUp(currentWord: string) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`
  );

  return res.ok;
}
