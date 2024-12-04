import { WordsOfTheDay } from "./components/words-of-the-day/words-of-the-day";
import { Board } from "./components/board/board";
import { Keyboard } from "./components/keyboard/keyboard";
import { IconButton } from "@components/button/icon-button";
import { Header } from "@components/header/header";

function App() {
  return (
    <div className="h-screen py-1 flex-1 flex flex-col max-w-xl mx-auto">
      <div className="top-half flex-1 flex flex-col overflow-y-auto scroll-smooth">
        <Header />
        <div className="board flex-1 flex flex-col justify-end p-4">
          <Board />
        </div>
      </div>
      <div className="sticky inset-0 bottom-0 bottom-half justify-end space-y-4 py-2 px-2 border rounded-md">
        <div className="flex justify-between">
          <IconButton title="Toggle keyboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="w-6 h-6"
            >
              <path d="M10 8h.01M12 12h.01M14 8h.01M16 12h.01M18 8h.01M6 8h.01M7 16h10M8 12h.01" />
              <rect width="20" height="16" x="2" y="4" rx="2" />
            </svg>
          </IconButton>
          <WordsOfTheDay />
          <IconButton title="Toggle keyboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="w-6 h-6"
            >
              <path d="M10 8h.01M12 12h.01M14 8h.01M16 12h.01M18 8h.01M6 8h.01M7 16h10M8 12h.01" />
              <rect width="20" height="16" x="2" y="4" rx="2" />
            </svg>
          </IconButton>
        </div>
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
