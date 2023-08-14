// import { useState } from "react";
import { useState } from "react";
import "./App.css";
import { Board, Keyboard, WordChain } from "./components/index";
// import { useGameDispatch, useGameState } from "./hooks/index";

function App() {
  // const { board: word, currentWord, wordLadder } = useGameState();
  // console.log({ word, currentWord, wordLadder });
  // const dispatch = useGameDispatch();
  const [word, setWord] = useState<string[][]>([]);

  const [currentWord, setCurrentWord] = useState<string[]>([]);
  const [wordLadder] = useState<{
    startWord: string;
    targetWord: string;
  }>({
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
        <WordChain {...wordLadder} />
        <Keyboard onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
