import "./App.css";
import { handleDictionaryLookUp } from "./components/GameProvider/utils";
import { Board, Keyboard, WordChain } from "./components/index";
import { useGameDispatch, useGameState } from "./hooks/use-game";

function App() {
  const state = useGameState();
  const dispatch = useGameDispatch();

  const handleClick = async (input: string) => {
    // TODO: Temp fix to do async call
    if (input === "ENTER") {
      const exists = await handleDictionaryLookUp(state);
      if (!exists) {
        dispatch({ type: "message", payload: "Not a dictionary word" });
        return;
      }
    }

    dispatch({ type: "keyboardClick", payload: input });
  };

  return (
    <div className="max-w-xl bg-white mx-auto flex flex-col h-[100dvh] py-6 space-y-4">
      <div className="space-y-4 px-2 md:px-5  flex items-center justify-center uppercase text-sm">
        {state.message}
      </div>

      <Board board={state.board} currentWord={state.currentWord} />
      <div className="space-y-4 px-2 md:px-5">
        <WordChain {...state.wordLadder} />
        <Keyboard onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
