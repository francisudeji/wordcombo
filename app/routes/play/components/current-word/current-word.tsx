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
    <div className="grid grid-cols-1 place-items-center ">
      <div
        className={cn(
          "flex items-center justify-center bg-white border rounded-3xl p-4 space-x-4 shadow-lg shadow-neutral-200 -mt-[50px]",
          message ? "animate-wiggle" : ""
        )}
      >
        {Array.from({ length: count }).map((_, index) => {
          return (
            <span
              draggable={currentWord[index] !== undefined}
              onDragStart={(e) => {
                if (currentWord[index] === undefined) {
                  e.preventDefault();
                  e.dataTransfer.effectAllowed = "none";
                  return;
                }

                e.dataTransfer.setData(
                  "text/current-letter",
                  currentWord[index]
                );
                e.dataTransfer.dropEffect = "move";
                dispatch({
                  type: "drag_started",
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
                  type: "drag_overed",
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
                  type: "drag_dropped",
                  payload: { index, letter },
                });

                e.dataTransfer.clearData();
              }}
              key={index}
              className={cn(
                "text-xl py-2 px-4 rounded-lg border border-dashed font-medium h-[50px] w-[50px] flex items-center justify-center transform transition-transform duration-200 hover:scale-105",
                {
                  "border-indigo-300": index === cursor,
                  "text-transparent": draggedOverElIndex === index,
                }
              )}
            >
              {currentWord[index] ?? " "}
            </span>
          );
        })}
      </div>
    </div>
  );
}
