export function WordOfTheDay({ word }: { word: string }) {
  return word.split("").map((letter, index) => {
    return (
      <span
        key={index}
        className="text-xs p-2 rounded-lg border border-dashed border-neutral-300 font-medium h-[24px] w-[24px] flex items-center justify-center dark:bg-[#2f2f2f] dark:text-[#ececec] dark:border-white/15"
      >
        {letter}
      </span>
    );
  });
}
