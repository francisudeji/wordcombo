interface KeyboardLayoutProps {
  onClick: (letter: string) => void;
}

const keyboardRows = [
  ["Q", "W", "E", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
] as const;

function KeyboardKey({
  letter,
  onClick,
}: {
  letter: (typeof keyboardRows)[number][number];
  onClick: (letter: string) => void;
}) {
  if (letter === "BACK") {
    return (
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
    );
  }

  if (letter === "ENTER") {
    return (
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
    );
  }
  return (
    <button
      key={letter}
      onClick={() => onClick(letter)}
      className="flex items-center justify-center text-center focus:bg-gray-200 hover:bg-gray-200 active:bg-gray-100 border border-slate-300 rounded-md p-5"
    >
      {letter}
    </button>
  );
}

export function Keyboard({ onClick }: KeyboardLayoutProps) {
  return (
    <div className="flex flex-col gap-2">
      {keyboardRows.map((row, index) => {
        return (
          <div key={index} className="grid grid-cols-9 gap-2">
            {row.map((letter) => (
              <KeyboardKey key={letter} letter={letter} onClick={onClick} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
