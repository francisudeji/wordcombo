import { useGameDispatch } from "../../hooks/use-game";

export function Paused() {
  const dispatch = useGameDispatch();

  return (
    <div className="flex flex-col flex-1 justify-center items-center text-center">
      <p className="text-lg font-semibold">Game Paused</p>
      <p className="text-sm text-neutral-500">
        Click the play button to continue
      </p>

      <button
        onClick={() => {
          dispatch({ type: "statusUpdated", payload: "playing" });
        }}
        className="mt-4 rounded-full select-none font-medium py-2 px-6 flex text-lg items-center justify-center bg-white text-center outline-none ring-1 ring-neutral-300 transform transition-transform focus:ring-2 focus:bg-neutral-100 focus:ring-neutral-300 hover:bg-neutral-100 active:bg-neutral-200 active:scale-95 focus:scale-100 aria-disabled:ring-neutral-300/50 aria-disabled:text-neutral-400 aria-disabled:cursor-not-allowed dark:bg-[#2f2f2f] dark:text-[#ececec] dark:ring-white/15 dark:focus:ring-white/30 dark:focus:bg-[#3a3a3a] dark:hover:bg-[#3a3a3a] dark:active:bg-[#3a3a3a] dark:active:ring-white/30 dark:focus:scale-105 dark:active:scale-95 dark:aria-disabled:ring-white/10 dark:aria-disabled:text-[#9e9e9e] dark:aria-disabled:cursor-not-allowed dark:aria-disabled:bg-opacity-10"
      >
        Play
      </button>
    </div>
  );
}
