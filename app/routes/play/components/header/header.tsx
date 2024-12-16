import { IconButton } from "../../components/button/icon-button";
import { useTimer } from "../../hooks/use-timer";

export function Timer() {
  const timer = useTimer();
  return <p className="text-sm tabular-nums text-pretty">{timer}</p>;
}

export function Header() {
  return (
    <header className="sticky inset-0 bg-white top-0 header py-1 border-b sm:border sm:rounded-md px-2">
      <div className="flex items-center justify-between ">
        <IconButton title="Back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </IconButton>
        <Timer />
        <IconButton title="Back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </IconButton>
      </div>

      <div className="grid grid-cols-1 place-items-center absolute top-0 left-0 w-full">
        <div className="flex items-center justify-center bg-white border rounded-2xl p-2 space-x-2 sm:space-x-4 shadow  mt-[50px]">
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            H
          </span>
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            E
          </span>
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            L
          </span>
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            L
          </span>
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            O
          </span>
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
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            W
          </span>
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            O
          </span>
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            R
          </span>
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            L
          </span>
          <span className="text-sm p-2 rounded-lg border border-dashed font-medium h-[24px] w-[24px] flex items-center justify-center">
            D
          </span>
        </div>
      </div>
    </header>
  );
}
