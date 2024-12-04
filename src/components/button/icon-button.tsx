import { PropsWithChildren } from "react";

interface IconButtonProps {
  title: string;
}
export function IconButton({
  title,
  children,
}: PropsWithChildren<IconButtonProps>) {
  return (
    <button
      title={title}
      className={`font-normal rounded-md py-2 flex items-center justify-center text-center text-xl`}
    >
      <span className="sr-only">{title}</span>
      {children}
    </button>
  );
}
