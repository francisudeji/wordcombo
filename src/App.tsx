import { StartTarget } from "@components/start-target/start-target";
import { useGameState } from "@hooks/use-game";
import { Board } from "@components/board/board";
import { Keyboard } from "@components/keyboard/keyboard";

function App() {
  const { message } = useGameState();

  return (
    <div className="max-w-xl bg-white mx-auto flex flex-col h-[100dvh] py-6 space-y-4">
      <div className="space-y-4 px-2 md:px-5  flex items-center justify-center uppercase text-sm">
        {message}
      </div>

      <Board />
      <div className="space-y-4 px-2 md:px-5">
        <StartTarget />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
