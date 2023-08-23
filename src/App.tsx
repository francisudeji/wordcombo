import "./App.css";
import { Board, Keyboard, WordChain } from "./components/index";
import { useGameDispatch, useGameState } from "./hooks/use-game";

function App() {
  const state = useGameState();
  const dispatch = useGameDispatch();

  const handleClick = (input: string) => {
    dispatch({ type: "keyboardClick", payload: input });
  };

  const handleGetMatch = (letter: string) => {
    let isPartialMatch = false;
    let isFullMatch = false;

    for (let i = 0; i < state.wordLadder.targetWord.length; i++) {
      isFullMatch = letter === state.wordLadder.targetWord[i];

      isPartialMatch = state.wordLadder.targetWord.includes(letter);
    }
    return { isPartialMatch, isFullMatch };
  };

  return (
    <div className="max-w-xl bg-slate-100 mx-auto flex flex-col h-[100dvh] py-6 space-y-4">
      <Board
        board={state.board}
        currentWord={state.currentWord}
        isMatch={handleGetMatch}
      />
      <div className="space-y-4 px-2 md:px-5">
        <WordChain {...state.wordLadder} />
        <Keyboard onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
