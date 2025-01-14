import { IconButton } from "../../components/button/icon-button";
import { useTimer } from "../../hooks/use-timer";

export function Timer({ paused }: { paused: boolean }) {
  const { pauseTimer, time } = useTimer(0, paused);
  return (
    <div className="flex items-center space-x-2">
      {!paused && (
        <IconButton
          title="toggle timer"
          className="px-2"
          onClick={() => pauseTimer()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        </IconButton>
      )}

      <p className="text-sm tabular-nums text-pretty">{time}</p>
    </div>
  );
}
