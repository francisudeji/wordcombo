import { cn } from "~/lib/utils";
import { useGameDispatch, useGameState } from "../../hooks/use-game";
import { useState } from "react";

export function CurrentWord() {
  const [draggedOverElIndex, setDraggedOverElIndex] = useState<number | null>(
    null
  );

  const { currentWord, message, count, cursor } = useGameState((state) => ({
    currentWord: state.currentWord,
    message: state.message,
    count: state.count,
    cursor: state.cursor,
  }));

  const dispatch = useGameDispatch();

  return (
    <div className="xs:w-3/4 sm:w-2/3 grid grid-cols-1 mx-auto px-2 sm:px-0">
      <div
        className={cn(
          "flex justify-between bg-white border rounded-3xl p-4 space-x-4 shadow-lg shadow-neutral-200 -mt-[50px] dark:bg-neutral-900 dark:border-white/15 dark:shadow-none",
          message ? "animate-wiggle" : ""
        )}
      >
        {Array.from({ length: count }).map((_, index) => {
          return (
            <span
              role="textbox"
              tabIndex={0}
              draggable={currentWord[index] !== undefined}
              onDragStart={(e) => {
                if (currentWord[index] === undefined) {
                  e.preventDefault();
                  e.dataTransfer.effectAllowed = "none";
                  return;
                }

                e.currentTarget.classList.add("bg-white");

                e.dataTransfer.setData(
                  "text/current-letter",
                  currentWord[index]
                );

                e.dataTransfer.dropEffect = "move";

                dispatch({
                  type: "dragStarted",
                  payload: index,
                });
              }}
              onDragOver={(e) => {
                e.preventDefault();
                if (!e.target || !e.dataTransfer.effectAllowed) return;

                if (e.target instanceof HTMLElement) {
                  e.target.classList.add("bg-indigo-50");
                  setDraggedOverElIndex(index);
                }

                dispatch({
                  type: "dragHovered",
                  payload: index,
                });
              }}
              onDragLeave={(e) => {
                if (e.target instanceof HTMLElement) {
                  e.target.classList.remove("bg-indigo-50");
                  setDraggedOverElIndex(null);
                }
              }}
              onDrop={(e) => {
                e.preventDefault();

                if (e.target instanceof HTMLElement) {
                  e.target.classList.remove("bg-indigo-50");
                  setDraggedOverElIndex(null);
                }

                const letter = e.dataTransfer.getData("text/current-letter");

                dispatch({
                  type: "dragDropped",
                  payload: { index, letter },
                });

                e.dataTransfer.clearData();
              }}
              key={index}
              className={cn(
                "text-xl py-2 px-4 rounded-lg border border-dashed border-neutral-300 font-medium h-[50px] w-[50px] flex items-center justify-center transform transition-transform duration-200 hover:scale-105 outline-none dark:bg-[#2f2f2f] dark:dark:text-[#ececec] dark:border-white/15",
                {
                  "border-neutral-500 dark:border-white/50": index === cursor,
                  "text-transparent": draggedOverElIndex === index,
                }
              )}
              onFocus={(e) => {
                e.target.classList.add("border-indigo-300");
                dispatch({ type: "cursorMoved", payload: index });
              }}
              onClick={(e) => {
                e.currentTarget.focus();
                dispatch({ type: "cursorMoved", payload: index });
              }}
            >
              {currentWord[index] ?? " "}
            </span>
          );
        })}
      </div>
    </div>
  );
}
