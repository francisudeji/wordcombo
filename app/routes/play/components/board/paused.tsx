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
          dispatch({ type: "toggle_paused" });
        }}
        className="mt-4 bg-primary-500 text-white rounded-full px-6 py-2 bg-neutral-950"
      >
        Play
      </button>
    </div>
  );
}
