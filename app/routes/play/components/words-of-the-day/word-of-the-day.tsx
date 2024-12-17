export function WordOfTheDay({ word }: { word: string }) {
  return word.split("").map((letter, index) => {
    return (
      <span
        key={index}
        className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center"
      >
        {letter}
      </span>
    );
  });
}
