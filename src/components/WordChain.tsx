interface WordLadder {
  startWord: string;
  targetWord: string;
}

export function WordChain({ startWord, targetWord }: WordLadder) {
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
