import { useState } from "react";
import "./App.css";

interface WordLadder {
  startWord: string;
  targetWord: string;
}
function WordInformation({ startWord, targetWord }: WordLadder) {
  return (
    <div className="flex items-center justify-center space-x-4 text-sm uppercase">
      <p className="uppercase">{startWord}</p>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </span>
      <p className="uppercase">{targetWord}</p>
    </div>
  );
}

interface KeyboardLayoutProps {
  onClick: (letter: string) => void;
}

function KeyboardLayout({ onClick }: KeyboardLayoutProps) {
  return (
    <div className="grid grid-cols-7 gap-4 text-sm font-semibold">
      <button
        onClick={() => onClick("A")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        A
      </button>
      <button
        onClick={() => onClick("B")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        B
      </button>
      <button
        onClick={() => onClick("C")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        C
      </button>
      <button
        onClick={() => onClick("D")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        D
      </button>
      <button
        onClick={() => onClick("E")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        E
      </button>
      <button
        onClick={() => onClick("F")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        F
      </button>
      <button
        onClick={() => onClick("G")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        G
      </button>
      <button
        onClick={() => onClick("H")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        H
      </button>
      <button
        onClick={() => onClick("I")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        I
      </button>
      <button
        onClick={() => onClick("J")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        J
      </button>
      <button
        onClick={() => onClick("K")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        K
      </button>
      <button
        onClick={() => onClick("L")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        L
      </button>
      <button
        onClick={() => onClick("M")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        M
      </button>
      <button
        onClick={() => onClick("N")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        N
      </button>
      <button
        onClick={() => onClick("O")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        O
      </button>
      <button
        onClick={() => onClick("P")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        P
      </button>
      <button
        onClick={() => onClick("Q")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        Q
      </button>
      <button
        onClick={() => onClick("R")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        R
      </button>
      <button
        onClick={() => onClick("S")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        S
      </button>
      <button
        onClick={() => onClick("T")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        T
      </button>
      <button
        onClick={() => onClick("U")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        U
      </button>
      <button
        aria-label="Back"
        title="Back"
        onClick={() => onClick("BACK")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 p-2 flex items-center justify-center text-red-500 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
          />
        </svg>
      </button>
      <button
        onClick={() => onClick("V")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        V
      </button>
      <button
        onClick={() => onClick("W")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        W
      </button>
      <button
        onClick={() => onClick("X")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        X
      </button>
      <button
        onClick={() => onClick("Y")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        Y
      </button>
      <button
        onClick={() => onClick("Z")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md px-4 py-2"
      >
        Z
      </button>

      <button
        aria-label="Enter"
        title="Enter"
        onClick={() => onClick("ENTER")}
        className="focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 p-2 flex items-center justify-center text-green-500 rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </button>
    </div>
  );
}

interface BoardProps {
  board: string[][];
  currentWord: string[];
  // isPartialMatch: (letter: string) => boolean;
  isMatch: (letter: string) => {
    isPartialMatch: boolean;
    isFullMatch: boolean;
  };
}
function Board({ board, currentWord, isMatch }: BoardProps) {
  return (
    <div className="flex-1 flex flex-col overflow-y-scroll px-5 relative">
      <div className="flex-1">stats</div>
      <div className="">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            {currentWord.map((letter, index) => {
              return (
                <span
                  key={index}
                  className="border border-slate-300 font-semibold py-3 flex items-center justify-center text-sm"
                >
                  {letter}
                </span>
              );
            })}
          </div>
          {board.map((b, index) => {
            return (
              <div
                key={`word-${index}`}
                className="grid grid-cols-4 gap-4 text-center"
              >
                {b.map((letter, index) => {
                  return (
                    <span
                      key={index}
                      className={`border border-slate-300 font-semibold py-3 flex items-center justify-center text-sm rounded-md ${
                        isMatch(letter).isPartialMatch
                          ? "bg-green-500 text-white"
                          : "bg-transparent"
                      }`}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="sticky bottom-0 h-10 -mt-5 bg-red-100 dark:bg-slate-600/20 blur-sm">
        <p className="invisible">a</p>
      </div> */}
    </div>
  );
}

function App() {
  const [word, setWord] = useState<string[][]>([
    // ["C", "O", "L", "D"],
    // ["B", "O", "L", "D"],
    // ["B", "O", "L", "E"],
    // ["S", "O", "L", "E"],
    // ["S", "O", "M", "E"],
    // ["C", "O", "M", "E"],
    // ["C", "O", "R", "E"],
    // ["W", "O", "R", "E"],
    // ["W", "O", "R", "M"],
    // ["W", "A", "R", "M"],
    // ["B", "O", "L", "D"],
    // ["B", "O", "L", "E"],
    // ["S", "O", "L", "E"],
    // ["S", "O", "M", "E"],
    // ["C", "O", "M", "E"],
    // ["C", "O", "R", "E"],
    // ["W", "O", "R", "E"],
    // ["W", "O", "R", "M"],
    // ["W", "A", "R", "M"],
  ]);

  const [currentWord, setCurrentWord] = useState<string[]>([]);
  const [wordLadder] = useState<WordLadder>({
    startWord: "COLD",
    targetWord: "WARM",
  });

  const handleClick = (input: string) => {
    if (input === "BACK") {
      if (currentWord.length === 0) return;

      const newLetters = currentWord.slice(0, currentWord.length - 1);
      setCurrentWord(() => newLetters);
      return;
    }

    if (input === "ENTER") {
      // TODO: lookup word in the dictionary

      const isNotCompleteWord = currentWord.length < 4;
      if (isNotCompleteWord) return;

      // Check that the first word is the start word
      if (word.length === 0 && currentWord.join("") !== wordLadder.startWord) {
        // must be the start word
        console.log(`Start word must be ${wordLadder.startWord}`);
        return;
      }

      if (word.length > 0) {
        // make sure whatever word typed is only one letter different from the last
        const lastWord = word.at(0) || [];
        const changedLetters = [];

        for (let i = 0; i < lastWord.length; i++) {
          if (lastWord.includes(currentWord[i])) {
            continue;
          } else {
            changedLetters.push(currentWord[i]);
          }
        }

        if (changedLetters.length > 1) {
          // changed more than one letter
          console.log("NO", changedLetters);
          return;
        }
      }

      setCurrentWord(() => []);
      const newWord = [currentWord, ...word];
      setWord(() => newWord);

      for (let i = 0; i < wordLadder.targetWord.length; i++) {
        const matches = currentWord[i] === wordLadder.targetWord[i];

        if (matches) {
          console.log(`Matches at ${currentWord[i]}`);
        }

        const partialMatch = wordLadder.targetWord.includes(currentWord[i]);
        if (partialMatch) {
          console.log(`Partial match at ${currentWord[i]}`);
        }
      }

      return;
    }

    const isCurrentWordFilledWithActualLetters = currentWord.filter(
      (l: string) => Boolean(l)
    );

    if (isCurrentWordFilledWithActualLetters.length > 3) return;

    setCurrentWord((prevLetters) => {
      return [...prevLetters, input];
    });
  };

  const handleGetMatch = (letter: string) => {
    let isPartialMatch = false;
    let isFullMatch = false;

    for (let i = 0; i < wordLadder.targetWord.length; i++) {
      isFullMatch = letter === wordLadder.targetWord[i];

      isPartialMatch = wordLadder.targetWord.includes(letter);
    }
    return { isPartialMatch, isFullMatch };
  };

  return (
    <div className="max-w-md bg-slate-100 mx-auto flex flex-col h-screen py-5 space-y-4">
      <Board board={word} currentWord={currentWord} isMatch={handleGetMatch} />
      <div className="space-y-4 px-5">
        <WordInformation {...wordLadder} />
        <KeyboardLayout onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
